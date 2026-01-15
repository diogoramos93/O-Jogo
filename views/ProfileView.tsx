
import React from 'react';
import { User, SportType } from '../types';
import { LEAGUE_CONFIG, SPORT_ICONS, BADGES } from '../constants';

const ProfileView: React.FC<{ user: User }> = ({ user }) => {
  const league = LEAGUE_CONFIG[user.league];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Hero Header */}
      <div className="text-center pt-4">
        <div className="relative inline-block">
          <div className={`absolute inset-0 rounded-full blur-3xl opacity-30 ${league.color}`}></div>
          <img src={user.photo} className="w-32 h-32 rounded-full border-4 border-white shadow-2xl relative z-10 mx-auto object-cover ring-8 ring-slate-50" />
          <div className={`absolute bottom-0 right-0 w-11 h-11 rounded-2xl border-4 border-white flex items-center justify-center text-xl z-20 shadow-xl ${league.color}`}>
            {league.icon}
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-xs font-bold text-slate-400">📍 {user.city}</span>
          <span className="text-slate-300">•</span>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">{user.playStyle}</span>
        </div>
      </div>

      {/* Points & Stats Card */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-50 rounded-full -mr-6 -mt-6"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Pontuação Total</p>
          <p className="text-3xl font-black text-indigo-600 leading-none">{user.totalPoints}</p>
          <p className="text-[9px] font-bold text-slate-500 mt-2 uppercase">Rank Mundial #2,4k</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-green-50 rounded-full -mr-6 -mt-6"></div>
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Partidas</p>
          <p className="text-3xl font-black text-slate-900 leading-none">42</p>
          <p className="text-[9px] font-bold text-green-500 mt-2 uppercase">78% Taxa Vitória</p>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between px-2 mb-4">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">Conquistas <span className="text-indigo-600 italic">({user.unlockedBadges.length}/{BADGES.length})</span></h3>
          <button className="text-[10px] font-black text-indigo-600 uppercase">Ver Todas</button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((badge) => {
            const isUnlocked = user.unlockedBadges.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`group relative flex flex-col items-center p-3 rounded-2xl border transition-all ${
                  isUnlocked 
                    ? 'bg-white border-indigo-100 shadow-sm shadow-indigo-50' 
                    : 'bg-slate-50 border-transparent opacity-40 grayscale'
                }`}
              >
                <span className={`text-2xl mb-1 ${isUnlocked ? 'animate-bounce-short' : ''}`}>{badge.icon}</span>
                <span className="text-[8px] font-black text-center text-slate-600 uppercase leading-none">{badge.name}</span>
                
                {/* Tooltip on Tap/Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-slate-900 text-white rounded-lg text-[9px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center">
                  <p className="font-black text-white">{badge.name}</p>
                  <p className="text-slate-400 mt-1">{badge.description}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sport Rankings */}
      <div>
        <h3 className="text-lg font-black text-slate-800 mb-4 px-2 tracking-tight">Evolução por <span className="text-indigo-600">Esporte</span></h3>
        <div className="space-y-3">
          {(Object.entries(user.rankings) as [SportType, number][]).map(([sport, pos]) => (
            pos > 0 && (
              <div key={sport} className="bg-white p-5 rounded-3xl flex items-center justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <span className="bg-slate-50 w-12 h-12 flex items-center justify-center rounded-2xl text-2xl shadow-inner ring-1 ring-slate-100">
                    {SPORT_ICONS[sport]}
                  </span>
                  <div>
                    <span className="font-black text-slate-800 uppercase text-xs tracking-widest">{sport}</span>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">ESTILO: {user.playStyle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-indigo-600">#{pos}</span>
                  <p className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">↑ 12 posições</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="pt-4 px-2">
        <button className="w-full bg-slate-100 text-slate-600 font-black py-4 rounded-3xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors border border-slate-200">
          Configurações da Conta ⚙️
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
