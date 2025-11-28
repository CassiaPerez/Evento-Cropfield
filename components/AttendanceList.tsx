import React, { useState, useMemo } from 'react';
import { Guest } from '../types';

interface AttendanceListProps {
  guests: Guest[];
  onBack: () => void;
  onLogout: () => void;
}

export const AttendanceList: React.FC<AttendanceListProps> = ({ guests, onBack, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuests = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return guests.filter(guest => 
      guest.name.toLowerCase().includes(lowerTerm) ||
      guest.role.toLowerCase().includes(lowerTerm)
    );
  }, [guests, searchTerm]);

  const handleExportCSV = () => {
    if (guests.length === 0) return;

    // Define CSV Headers
    const headers = ['ID', 'Nome', 'Cargo', 'Horário Check-in', 'Mensagem Boas-vindas'];
    
    // Process Data
    const csvRows = guests.map(guest => {
      const dateStr = new Date(guest.checkInTime).toLocaleString('pt-BR');
      // Escape strings to handle commas and quotes inside the text
      const escape = (text: string) => `"${text.replace(/"/g, '""')}"`;
      
      return [
        escape(guest.id),
        escape(guest.name),
        escape(guest.role),
        escape(dateStr),
        escape(guest.welcomeMessage)
      ].join(',');
    });

    // Combine Headers and Rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // Create Blob with BOM for Excel compatibility (UTF-8)
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Trigger Download
    const link = document.createElement('a');
    link.href = url;
    link.download = `lista_presenca_cropfield_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl animate-fade-in flex flex-col h-[80vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Lista de Presença
              <span className="px-2 py-1 rounded-full bg-brand-900/50 text-brand-400 text-xs border border-brand-700/50">
                {guests.length} total
              </span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 font-mono">ADMIN</span>
          </div>
          <p className="text-slate-400 text-sm mt-1">Gerencie os participantes e horários de entrada</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             </div>
             <input 
               type="text" 
               placeholder="Buscar por nome ou cargo..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full md:w-64 bg-slate-800/50 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent block pl-10 p-2.5 outline-none transition-all placeholder-slate-500"
             />
          </div>

          <div className="flex gap-2">
            <button 
                onClick={handleExportCSV}
                disabled={guests.length === 0}
                className="px-4 py-2 rounded-lg bg-emerald-900/30 hover:bg-emerald-800/50 text-emerald-400 text-sm transition-colors border border-emerald-800/50 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Exportar para Excel/CSV"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span className="hidden sm:inline">Exportar</span>
            </button>

            <button 
                onClick={onBack}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors border border-slate-700 whitespace-nowrap flex items-center justify-center gap-2"
                title="Voltar para Check-in"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                <span className="hidden sm:inline">Check-in</span>
            </button>
            
            <button 
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm transition-colors border border-red-900/30 whitespace-nowrap flex items-center justify-center gap-2"
                title="Sair do modo Admin"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sair
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {filteredGuests.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 border-2 border-dashed border-slate-800 rounded-xl">
            {guests.length === 0 ? (
               <>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <p>Nenhum participante validado ainda.</p>
               </>
            ) : (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                 <p>Nenhum resultado para "{searchTerm}"</p>
               </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredGuests.map((guest, index) => (
              <div 
                key={guest.id} 
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4 hover:bg-slate-800/60 transition-colors relative group animate-appear"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl shadow-inner shrink-0 border border-transparent group-hover:border-brand-500/30 transition-all">
                  {guest.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate" title={guest.name}>{guest.name}</h3>
                  <p className="text-brand-400 text-xs font-medium truncate mb-2">{guest.role}</p>
                  
                  <div className="flex items-center gap-2 bg-slate-900/30 p-1.5 rounded-lg border border-slate-700/30 w-fit">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                       <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                       Entrada:
                    </span>
                    <span className="text-xs text-slate-200 font-mono">
                        {new Date(guest.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};