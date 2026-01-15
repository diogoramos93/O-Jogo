
import React from 'react';
import { User } from '../types';

interface TopBarProps {
  user: User;
  onConceptClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ user, onConceptClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-100">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-indigo-200 shadow-lg">
          C
        </div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">Court<span className="text-indigo-600 italic">Clash</span></h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={onConceptClick}
          className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors"
        >
          CONCEITO
        </button>
        <img 
          src={user.photo} 
          alt={user.name} 
          className="w-9 h-9 rounded-full border-2 border-white ring-2 ring-indigo-100 shadow-sm"
        />
      </div>
    </header>
  );
};

export default TopBar;
