
import React, { useState } from 'react';
import { SportType, MatchFormat, Challenge, League } from '../types';
import { SPORT_ICONS } from '../constants';

interface CreateProps {
  onCreated: (ch: Challenge) => void;
}

const CreateChallengeView: React.FC<CreateProps> = ({ onCreated }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sport: SportType.TENNIS,
    format: MatchFormat.BEST_OF_3,
    location: '',
    date: 'Hoje, 20:00',
    isPrivate: false
  });

  const handleSubmit = () => {
    const newChallenge: Challenge = {
      id: Math.random().toString(36).substr(2, 9),
      creatorId: 'user_1',
      creatorName: 'Alex Silva',
      creatorPhoto: 'https://picsum.photos/seed/alex/200',
      creatorLeague: League.SILVER,
      sport: formData.sport,
      format: formData.format,
      location: formData.location || 'Clube Local',
      date: formData.date,
      isPrivate: formData.isPrivate,
      status: 'open'
    };
    onCreated(newChallenge);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-10 duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">
          🎾
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800">Novo <span className="text-indigo-600">Desafio</span></h2>
          <p className="text-xs font-bold text-slate-400 uppercase">Criação rápida em 30 seg</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 rounded-full flex-1 transition-colors ${step >= s ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Selecione o Esporte</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(SportType).map((sport) => (
                <button
                  key={sport}
                  onClick={() => { setFormData({...formData, sport}); setStep(2); }}
                  className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all ${
                    formData.sport === sport ? 'border-indigo-600 bg-indigo-50 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <span className="text-3xl bg-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-sm border border-slate-50">
                    {SPORT_ICONS[sport]}
                  </span>
                  <span className="font-black text-slate-800 uppercase tracking-tight">{sport}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900">Formato da Partida</h3>
            <div className="grid grid-cols-1 gap-3">
              {Object.values(MatchFormat).map((format) => (
                <button
                  key={format}
                  onClick={() => { setFormData({...formData, format}); setStep(3); }}
                  className={`p-5 rounded-3xl border-2 text-left transition-all ${
                    formData.format === format ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 bg-white'
                  }`}
                >
                  <p className="font-black text-slate-800 uppercase text-sm mb-1">{format}</p>
                  <p className="text-xs text-slate-400 font-medium">Pontuação oficial válida para ranking global.</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="w-full text-slate-400 font-bold py-2">Voltar</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Local do Jogo</label>
                <input
                  type="text"
                  placeholder="Ex: Arena G6, Ibirapuera..."
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-indigo-600 outline-none font-medium"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase mb-2">Data e Hora</label>
                <input
                  type="text"
                  placeholder="Hoje, 20:30"
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 focus:border-indigo-600 outline-none font-medium"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold text-slate-800 text-sm">Privado</p>
                  <p className="text-[10px] text-slate-400">Apenas amigos podem aceitar</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={formData.isPrivate}
                  onChange={e => setFormData({...formData, isPrivate: e.target.checked})}
                  className="w-6 h-6 rounded-lg accent-indigo-600"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleSubmit}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-100"
              >
                PUBLICAR DESAFIO 🚀
              </button>
              <button onClick={() => setStep(2)} className="w-full text-slate-400 font-bold py-2">Voltar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateChallengeView;
