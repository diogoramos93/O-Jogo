
import React from 'react';

interface BottomNavProps {
  activeTab: 'feed' | 'rankings' | 'add' | 'profile';
  setActiveTab: (tab: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'feed', icon: '🏠', label: 'Feed' },
    { id: 'rankings', icon: '🏆', label: 'Ranking' },
    { id: 'add', icon: '➕', label: 'Desafio', primary: true },
    { id: 'profile', icon: '👤', label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-2 flex justify-between items-center z-40 pb-safe">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === tab.id 
              ? 'text-indigo-600 scale-110' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {tab.primary ? (
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center -mt-8 shadow-xl shadow-indigo-200 border-4 border-white">
              <span className="text-white text-2xl">+</span>
            </div>
          ) : (
            <span className="text-2xl">{tab.icon}</span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
