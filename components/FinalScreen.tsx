import React from 'react';
import { Logo } from './Logo';

export const FinalScreen: React.FC = () => {
  return (
    <div className="text-center p-8 animate-fade-in flex flex-col items-center">
      <div className="w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full"></div>
          <Logo className="w-full h-full relative z-10 drop-shadow-2xl" />
      </div>
      
      <h1 className="text-3xl font-bold text-white mb-2">Check-in Confirmado!</h1>
      <p className="text-xl text-brand-300 font-light mb-8">Bom evento.</p>
      
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 max-w-xs mx-auto">
        <p className="text-slate-400 text-sm mb-2">Seu acesso foi liberado.</p>
        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
      
      <p className="mt-12 text-slate-600 text-xs uppercase tracking-widest">Cropfield • Raízes do Futuro</p>
    </div>
  );
};