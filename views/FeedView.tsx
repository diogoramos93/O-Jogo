
import React, { useState } from 'react';
import { Challenge, User, PlayStyle, SportType, MatchScore, MatchFormat } from '../types';
import { LEAGUE_CONFIG, SPORT_ICONS } from '../constants';

interface FeedViewProps {
  challenges: Challenge[];
  user: User;
}

const FeedView: React.FC<FeedViewProps> = ({ challenges, user }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterDist, setFilterDist] = useState(10);
  const [selectedPlayStyle, setSelectedPlayStyle] = useState<PlayStyle | 'Todos'>('Todos');
  const [reportingMatch, setReportingMatch] = useState<Challenge | null>(null);
  const [scoreInput, setScoreInput] = useState<{s1p1: number, s1p2: number, s2p1: number, s2p2: number, s3p1: number, s3p2: number}>({
    s1p1: 0, s1p2: 0, s2p1: 0, s2p2: 0, s3p1: 0, s3p2: 0
  });
  const [showSuccessPoints, setShowSuccessPoints] = useState<number | null>(null);

  const handleReportSubmit = () => {
    if (!reportingMatch) return;
    
    // In a real app, this data would be sent to the server.
    // If both players have reported and scores match, status becomes 'completed'.
    // Here we simulate a successful validation for the demo.
    
    const isWinner = (scoreInput.s1p1 + scoreInput.s2p1 + scoreInput.s3p1) > (scoreInput.s1p2 + scoreInput.s2p2 + scoreInput.s3p2);
    const points = isWinner ? 25 : 10;

    setShowSuccessPoints(points);
    setTimeout(() => {
        setShowSuccessPoints(null);
        setReportingMatch(null);
        // Reset score input
        setScoreInput({ s1p1: 0, s1p2: 0, s2p1: 0, s2p2: 0, s3p1: 0, s3p2: 0 });
    }, 3000);
  };

  const filteredChallenges = challenges.filter(ch => {
    // Show active/pending matches at the top regardless of filters
    if (ch.status === 'accepted' || ch.status === 'pending_validation') return true;
    
    const distMatch = ch.distance ? ch.distance <= filterDist : true;
    const styleMatch = selectedPlayStyle === 'Todos' || ch.creatorPlayStyle === selectedPlayStyle;
    return distMatch && styleMatch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Success Animation Overlay */}
      {showSuccessPoints !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300 px-6">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl flex flex-col items-center animate-bounce border-4 border-indigo-100">
            <span className="text-7xl mb-4">🏆</span>
            <p className="text-5xl font-black text-indigo-600">+{showSuccessPoints} XP</p>
            <p className="font-bold text-slate-400 uppercase text-sm mt-4 tracking-widest text-center">
              Partida Validada e Processada!
            </p>
            <p className="text-[10px] text-slate-300 mt-2 italic">Aguardando confirmação do servidor...</p>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingMatch && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm animate-in slide-in-from-bottom-full duration-500">
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 pb-12 space-y-8 shadow-2xl border-t border-indigo-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-800">Relatar Placar</h3>
                <p className="text-xs font-bold text-slate-400 uppercase">{reportingMatch.sport} • {reportingMatch.format}</p>
              </div>
              <button onClick={() => setReportingMatch(null)} className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">✕</button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 items-center bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Você</p>
                   <div className="w-12 h-12 rounded-full bg-indigo-100 mx-auto flex items-center justify-center border-2 border-white">
                     <span className="text-xl">👤</span>
                   </div>
                </div>
                <div className="text-center font-black text-slate-300 text-xl italic uppercase">VS</div>
                <div className="text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Adversário</p>
                   <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto flex items-center justify-center border-2 border-white">
                     <span className="text-xl">🎾</span>
                   </div>
                </div>
              </div>

              {/* Set Inputs */}
              <div className="space-y-4">
                {[1, 2].map((setNum) => (
                  <div key={setNum} className="flex items-center justify-between gap-4">
                    <span className="w-12 text-xs font-black text-slate-400 uppercase">Set {setNum}</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-center font-black text-xl focus:border-indigo-600 outline-none"
                      placeholder="0"
                      value={setNum === 1 ? scoreInput.s1p1 : scoreInput.s2p1}
                      onChange={(e) => setScoreInput({
                        ...scoreInput, 
                        [setNum === 1 ? 's1p1' : 's2p1']: parseInt(e.target.value) || 0
                      })}
                    />
                    <span className="text-slate-200 font-bold">:</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-center font-black text-xl focus:border-indigo-600 outline-none"
                      placeholder="0"
                      value={setNum === 1 ? scoreInput.s1p2 : scoreInput.s2p2}
                      onChange={(e) => setScoreInput({
                        ...scoreInput, 
                        [setNum === 1 ? 's1p2' : 's2p2']: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                ))}
                
                {reportingMatch.format === MatchFormat.BEST_OF_3 && (
                   <div className="flex items-center justify-between gap-4 opacity-50 focus-within:opacity-100 transition-opacity">
                    <span className="w-12 text-xs font-black text-slate-400 uppercase italic">Tiebreak?</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-center font-black text-xl focus:border-indigo-600 outline-none"
                      placeholder="0"
                      value={scoreInput.s3p1}
                      onChange={(e) => setScoreInput({...scoreInput, s3p1: parseInt(e.target.value) || 0})}
                    />
                    <span className="text-slate-200 font-bold">:</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-center font-black text-xl focus:border-indigo-600 outline-none"
                      placeholder="0"
                      value={scoreInput.s3p2}
                      onChange={(e) => setScoreInput({...scoreInput, s3p2: parseInt(e.target.value) || 0})}
                    />
                  </div>
                )}
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <p className="text-[10px] text-amber-700 font-bold leading-tight">
                  ⚠️ Lembre-se: O adversário também deve relatar o mesmo placar. Divergências propositais podem resultar em banimento por fraude.
                </p>
              </div>

              <button 
                onClick={handleReportSubmit}
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 text-sm uppercase tracking-widest active:scale-95 transition-all"
              >
                Enviar e Validar 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Feed de <span className="text-indigo-600">Jogos</span></h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encontre ou valide partidas</p>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2.5 rounded-2xl transition-all ${showFilters ? 'bg-indigo-600 text-white shadow-xl' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-50 space-y-6 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Filtros Inteligentes</h3>
            <button onClick={() => { setFilterDist(10); setSelectedPlayStyle('Todos'); }} className="text-[10px] font-black text-indigo-600 uppercase">Resetar</button>
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <label className="text-[10px] font-black text-slate-400 uppercase">Distância Máxima</label>
              <span className="text-xs font-black text-indigo-600">{filterDist} KM</span>
            </div>
            <input type="range" min="1" max="50" value={filterDist} onChange={(e) => setFilterDist(parseInt(e.target.value))} className="w-full h-2 bg-slate-100 rounded-lg appearance-none accent-indigo-600" />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase block mb-3">Estilo de Jogo</label>
            <div className="flex flex-wrap gap-2">
              {['Todos', ...Object.values(PlayStyle)].map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedPlayStyle(s as any)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${selectedPlayStyle === s ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenges List */}
      <div className="grid gap-4">
        {filteredChallenges.map((ch) => {
          const isActive = ch.status === 'accepted';
          const isPending = ch.status === 'pending_validation';

          return (
            <div key={ch.id} className={`bg-white rounded-[32px] p-6 shadow-sm border transition-all ${
              isActive ? 'border-amber-200 bg-amber-50/30' : 
              isPending ? 'border-indigo-200 bg-indigo-50/30' : 
              'border-slate-100'
            }`}>
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={ch.creatorPhoto} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-lg flex items-center justify-center text-[8px] text-white font-bold ${LEAGUE_CONFIG[ch.creatorLeague].color}`}>
                      {LEAGUE_CONFIG[ch.creatorLeague].icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 leading-tight">{ch.creatorName}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {ch.creatorLeague} • {ch.creatorPlayStyle || 'Versátil'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-white w-10 h-10 flex items-center justify-center rounded-xl text-xl shadow-sm border border-slate-50">
                    {SPORT_ICONS[ch.sport]}
                  </span>
                  {!isActive && !isPending && (
                    <span className="text-[9px] font-black text-indigo-600 mt-2">{ch.distance} KM</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <p className="text-xs font-bold text-slate-600 truncate">{ch.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🕒</span>
                  <p className="text-xs font-bold text-slate-600">{ch.date}</p>
                </div>
              </div>

              {isActive ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest animate-pulse">Partida em Andamento</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">ID: {ch.id}</span>
                  </div>
                  <button 
                    onClick={() => setReportingMatch(ch)}
                    className="w-full bg-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-100 text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Relatar Resultado ✍️
                  </button>
                </div>
              ) : isPending ? (
                <div className="bg-indigo-600 text-white p-4 rounded-2xl flex items-center justify-between">
                   <p className="text-xs font-black uppercase tracking-widest">Aguardando Adversário</p>
                   <span className="text-xl animate-spin">⏳</span>
                </div>
              ) : (
                <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-200 text-xs uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2">
                  Aceitar Desafio ⚔️
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Gamification Banner */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] p-6 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Progressão de Liga</p>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black">TOP 12%</span>
          </div>
          <h4 className="text-2xl font-black mb-4 leading-tight">Prata → Ouro</h4>
          <div className="w-full bg-black/20 rounded-full h-3 mb-3 overflow-hidden">
            <div className="bg-white h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ width: '65%' }}></div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-black">1250 <span className="text-xs font-medium opacity-60">XP</span></p>
              <p className="text-[9px] font-bold opacity-60 uppercase mt-1">Meta: 1500 XP</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest">Bônus Próximo Jogo</p>
              <p className="text-sm font-black text-amber-400">+10 XP EXTRA 🔥</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-[80px]"></div>
      </div>
    </div>
  );
};

export default FeedView;
