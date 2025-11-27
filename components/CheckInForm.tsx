import React, { useState } from 'react';
import { Logo } from './Logo';

interface CheckInFormProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export const CheckInForm: React.FC<CheckInFormProps> = ({ onSubmit, isLoading, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl transform transition-all animate-slide-up border border-brand-500/20">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 relative">
           <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full"></div>
           <Logo className="w-full h-full relative z-10 drop-shadow-lg" />
        </div>
        
        <h2 className="text-2xl font-bold text-white">Check-in Cropfield</h2>
        <p className="text-brand-300 text-sm font-medium mt-1 uppercase tracking-wider">Raízes do Futuro</p>
        <p className="text-slate-400 mt-4 text-sm">Por favor, informe seu nome completo para gerar sua credencial.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-100 mb-2">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/60 border border-brand-800/50 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-white placeholder-slate-500 transition-all outline-none"
            placeholder="Ex: Ana Silva"
            required
            autoFocus
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className={`w-full py-3.5 px-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2
            ${isLoading || !name.trim() 
              ? 'bg-slate-800 cursor-not-allowed text-slate-500 border border-slate-700' 
              : 'bg-gradient-to-r from-brand-700 to-brand-500 hover:from-brand-600 hover:to-brand-400 shadow-lg shadow-brand-600/30 active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validando...
            </>
          ) : (
            'Confirmar Presença'
          )}
        </button>
        
        {!isLoading && (
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full text-sm text-brand-300/70 hover:text-white transition-colors py-2"
          >
            Voltar
          </button>
        )}
      </form>
    </div>
  );
};