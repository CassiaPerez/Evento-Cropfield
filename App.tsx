import React, { useState } from 'react';
import { ViewState, Guest } from './types';
import { generateGuestPersona } from './services/geminiService';
import { EventQRCode } from './components/EventQRCode';
import { CheckInForm } from './components/CheckInForm';
import { Badge } from './components/Badge';
import { AttendanceList } from './components/AttendanceList';
import { Logo } from './components/Logo';
import { AdminLogin } from './components/AdminLogin';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const handleSimulateScan = () => {
    setView('check-in');
  };

  const handleCheckIn = async (name: string) => {
    setIsLoading(true);
    try {
      // Call Gemini API to get persona
      const persona = await generateGuestPersona(name);
      
      const newGuest: Guest = {
        id: crypto.randomUUID(),
        name,
        checkInTime: new Date().toISOString(),
        role: persona.role,
        welcomeMessage: persona.welcomeMessage,
        emoji: persona.emoji,
      };

      setGuests(prev => [newGuest, ...prev]);
      setCurrentGuest(newGuest);
      setView('success');
    } catch (error) {
      console.error("Check-in failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseBadge = () => {
    // Return to landing page for the next guest
    setView('landing');
  };

  const handleBackToLanding = () => {
    setView('landing');
  };
  
  const handleAdminAccessRequest = () => {
    if (isAdmin) {
      setView('list');
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = (password: string) => {
    if (password === 'cropfield' || password === 'admin') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setView('list');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-brand-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-800/20 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/30 blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
          <div className="w-10 h-10 bg-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-white/10 group-hover:border-brand-400/30 transition-colors">
            <Logo className="w-8 h-8" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden md:block group-hover:text-brand-300 transition-colors">Cropfield</span>
        </div>
        
        {view !== 'list' && (
          <button 
            onClick={handleAdminAccessRequest}
            className={`text-sm font-medium transition-colors flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 ${isAdmin ? 'text-brand-300 border-brand-500/30' : 'text-slate-400 hover:text-white'}`}
            title="Área Administrativa"
          >
            {isAdmin ? (
               // Unlocked Icon
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
            ) : (
               // Locked Icon
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            )}
            <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Admin'}</span>
          </button>
        )}
      </header>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onCancel={() => setShowAdminLogin(false)} 
        />
      )}

      {/* Main Content Area */}
      <main className="w-full max-w-5xl flex flex-col items-center justify-center min-h-[600px]">
        {view === 'landing' && (
          <EventQRCode onSimulateScan={handleSimulateScan} />
        )}

        {view === 'check-in' && (
          <CheckInForm 
            onSubmit={handleCheckIn} 
            isLoading={isLoading} 
            onCancel={handleBackToLanding}
          />
        )}

        {view === 'success' && currentGuest && (
          <Badge 
            guest={currentGuest} 
            onClose={handleCloseBadge} 
          />
        )}

        {view === 'list' && (
          <AttendanceList 
            guests={guests} 
            onBack={handleBackToLanding}
            onLogout={handleAdminLogout}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-slate-500 text-xs">
        <p>Powered by Google Gemini & React</p>
      </footer>
    </div>
  );
};

export default App;