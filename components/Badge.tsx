import React from 'react';
import { Guest } from '../types';

interface BadgeProps {
  guest: Guest;
  onClose: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ guest, onClose }) => {
  return (
    <div className="w-full max-w-sm relative group animate-pop-in">
       {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-brand-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
      
      <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
        {/* Header Pattern */}
        <div className="h-32 bg-gradient-to-br from-brand-900 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-6xl animate-bounce-slow">{guest.emoji}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center -mt-10 relative z-10">
          <div className="inline-block px-4 py-1 rounded-full bg-slate-800 border border-brand-500/50 text-brand-400 text-xs font-bold tracking-wider uppercase mb-4 shadow-lg">
            Acesso Confirmado
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-1 leading-tight">{guest.name}</h1>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 font-semibold text-lg mb-4">
            {guest.role}
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
            <p className="text-slate-300 text-sm italic">"{guest.welcomeMessage}"</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 border-t border-slate-800 pt-4">
             <div>
                <span className="block text-slate-400 uppercase tracking-wider text-[10px]">Check-in</span>
                <span className="font-mono text-slate-200">{new Date(guest.checkInTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             </div>
             <div>
                <span className="block text-slate-400 uppercase tracking-wider text-[10px]">ID</span>
                <span className="font-mono text-slate-200">#{guest.id.slice(0,6)}</span>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/50 border-t border-slate-800 text-center">
          <button 
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors border border-slate-700 hover:border-brand-500/30"
          >
            Concluir Check-in
          </button>
        </div>
      </div>
    </div>
  );
};