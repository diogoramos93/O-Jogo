
import React, { useState } from 'react';
import { League, SportType } from '../types';
import { LEAGUE_CONFIG } from '../constants';

const RankingsView: React.FC = () => {
  const [activeSport, setActiveSport] = useState(SportType.TENNIS);
  const [activeLeague, setActiveLeague] = useState(League.GOLD);

  const mockRankedPlayers = [
    { rank: 1, name: 'Lucas Ferraz', pts: 2840, winRate: '85%', trend: 'up' },
    { rank: 2, name: 'Mariana Silva', pts: 2710, winRate: '82%', trend: 'stable' },
    { rank: 3, name: 'Carlos Brum', pts: 2650, winRate: '79%', trend: 'down' },
    { rank: 4, name: 'Fernanda L.', pts: 2500, winRate: '75%', trend: 'up' },
    { rank: 5, name: 'Você', pts: 1250, winRate: '78%', trend: 'up', isSelf: true },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-800 px-2">Líderes de <span className="text-indigo-600">Quadra</span></h2>

      {/* Sport Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {Object.values(SportType).map(sport => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs whitespace-nowrap transition-all ${
              activeSport === sport ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100'
            }`}
          >
            {sport.toUpperCase()}
          </button>
        ))}
      </div>

      {/* League Selector */}
      <div className="grid grid-cols-4 gap-2">
        {Object.values(League).map(l => (
          <button
            key={l}
            onClick={() => setActiveLeague(l)}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${
              activeLeague === l ? 'bg-white border-indigo-600 shadow-sm' : 'bg-slate-50 border-transparent opacity-60'
            }`}
          >
            <span className="text-xl">{LEAGUE_CONFIG[l].icon}</span>
            <span className="text-[8px] font-black uppercase text-slate-600">{l}</span>
          </button>
        ))}
      </div>

      {/* Rankings List */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
        <div className="bg-slate-50 px-6 py-3 flex justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase">Posição / Jogador</span>
          <span className="text-[10px] font-black text-slate-400 uppercase">Pontos / Vitórias</span>
        </div>
        <div className="divide-y divide-slate-50">
          {mockRankedPlayers.map((player) => (
            <div 
              key={player.name} 
              className={`px-6 py-4 flex items-center justify-between ${player.isSelf ? 'bg-indigo-50/50' : ''}`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-6 text-center font-black text-lg ${
                  player.rank === 1 ? 'text-yellow-500' : player.rank === 2 ? 'text-slate-400' : player.rank === 3 ? 'text-orange-500' : 'text-slate-300'
                }`}>
                  {player.rank}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${player.name}/100`} />
                  </div>
                  <span className={`font-bold text-sm ${player.isSelf ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {player.name} {player.isSelf && '(Você)'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900 text-sm">{player.pts}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">{player.winRate} Win rate</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingsView;
