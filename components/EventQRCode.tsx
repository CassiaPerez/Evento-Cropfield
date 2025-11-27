import React, { useState } from 'react';
import { Logo } from './Logo';

interface EventQRCodeProps {
  onSimulateScan: () => void;
}

export const EventQRCode: React.FC<EventQRCodeProps> = ({ onSimulateScan }) => {
  const [showPrintView, setShowPrintView] = useState(false);

  // Get current URL or default to localhost for demo
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const isLocalhost = currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1');
  const checkInUrl = `${currentUrl}?mode=checkin`;
  
  // High res QR for printing
  const qrUrlHighRes = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(checkInUrl)}&color=1e3a8a&bgcolor=ffffff`;
  // Screen QR
  const qrUrlScreen = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(checkInUrl)}&color=1e3a8a&bgcolor=eff6ff`;

  if (showPrintView) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-slate-900 p-8 w-full animate-fade-in">
        <div className="w-full max-w-2xl border-4 border-brand-900 p-12 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-brand-500 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-brand-500 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-brand-500 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-brand-500 rounded-br-xl"></div>

          <Logo className="w-40 h-40 mb-8" />
          
          <h1 className="text-6xl font-black text-brand-900 mb-2 tracking-tight">CROPFIELD</h1>
          <p className="text-3xl text-brand-600 font-light tracking-[0.2em] uppercase mb-12">Raízes do Futuro</p>
          
          <div className="bg-white p-4 rounded-xl shadow-2xl border-2 border-slate-100 mb-10">
            <img 
              src={qrUrlHighRes} 
              alt="QR Code Oficial" 
              className="w-96 h-96 object-contain"
            />
          </div>

          <p className="text-2xl font-bold text-slate-800 mb-2">Check-in Digital</p>
          <p className="text-slate-500 text-lg">Aponte a câmera do seu celular para confirmar presença</p>

          <div className="mt-12 pt-8 border-t border-slate-200 w-full">
            <p className="text-sm text-slate-400 font-mono">12/12/2025 • Acesso Exclusivo</p>
          </div>
        </div>

        <div className="fixed bottom-8 flex gap-4 no-print">
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Imprimir Cartaz
          </button>
          <button 
            onClick={() => setShowPrintView(false)}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in w-full max-w-4xl">
      
      {isLocalhost && (
        <div className="w-full max-w-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 px-4 py-3 rounded-lg mb-8 text-sm flex items-center gap-3 text-left">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
           <div>
             <strong>Atenção: Você está em Localhost.</strong><br/>
             O QR Code abaixo aponta para este computador. Para que outros usuários acessem pelo celular, publique este projeto (Vercel, Netlify, etc).
           </div>
        </div>
      )}

      <div className="mb-8 flex flex-col items-center">
        <Logo className="w-24 h-24 mb-6 drop-shadow-2xl" />
        
        <div className="inline-block px-3 py-1 bg-brand-900/50 border border-brand-500/30 rounded-full text-brand-300 text-xs font-bold tracking-wider mb-3 shadow-sm">
          12/12/25
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">CROPFIELD</h2>
        <p className="text-xl md:text-2xl text-brand-400 font-light tracking-widest uppercase">Raízes do Futuro</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        {/* QR Display Card */}
        <div className="relative group cursor-pointer" onClick={onSimulateScan}>
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-lg blur opacity-30 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-white p-4 rounded-lg border border-slate-200 shadow-xl">
            <img 
              src={qrUrlScreen} 
              alt="Event QR Code" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-md"
            />
          </div>
          <p className="mt-4 text-xs text-brand-200/70 uppercase tracking-widest font-semibold">Toque para simular Scan</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <div className="text-left bg-slate-800/50 p-4 rounded-xl border border-slate-700">
             <p className="text-xs text-slate-400 mb-1">Link de Check-in:</p>
             <p className="text-brand-300 font-mono text-xs break-all">{checkInUrl}</p>
          </div>

          <button 
            onClick={onSimulateScan}
            className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-brand-600/30 flex items-center justify-center gap-3 w-full md:w-64 transform hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="10" x="7" y="7" rx="2"/><path d="M17 17h.01"/><path d="M17 12h.01"/><path d="M12 17h.01"/><path d="M7 17h.01"/><path d="M7 12h.01"/></svg>
            Simular Leitura
          </button>
          
          <button 
            onClick={() => setShowPrintView(true)}
            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-brand-200 hover:text-white border border-brand-500/30 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 w-full md:w-64"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Gerar Cartaz para Impressão
          </button>
        </div>
      </div>
    </div>
  );
};