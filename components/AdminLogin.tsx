import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onCancel}></div>
      
      <div className="relative w-full max-w-sm p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl animate-pop-in">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Acesso Administrativo
        </h3>
        
        <p className="text-slate-400 text-sm mb-6">
          Esta área é restrita aos organizadores do evento.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 bg-slate-950 border rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-white placeholder-slate-600 outline-none transition-all ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-800'}`}
              placeholder="Digite a senha (cropfield)"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-2 animate-pulse">Senha incorreta. Tente novamente.</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!password}
              className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Acessar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};