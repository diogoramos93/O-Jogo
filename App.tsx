
import React, { useState, useEffect } from 'react';
import { User, SportType, Challenge, League } from './types';
import { INITIAL_USER, MOCK_CHALLENGES } from './constants';
import FeedView from './views/FeedView';
import ProfileView from './views/ProfileView';
import RankingsView from './views/RankingsView';
import CreateChallengeView from './views/CreateChallengeView';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'rankings' | 'add' | 'profile'>('feed');
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [showConcept, setShowConcept] = useState(false);

  // Simple "routing"
  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedView challenges={challenges} user={user} />;
      case 'rankings':
        return <RankingsView />;
      case 'add':
        return <CreateChallengeView onCreated={(newCh) => {
          setChallenges([newCh, ...challenges]);
          setActiveTab('feed');
        }} />;
      case 'profile':
        return <ProfileView user={user} />;
      default:
        return <FeedView challenges={challenges} user={user} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 max-w-md mx-auto relative shadow-2xl">
      <TopBar user={user} onConceptClick={() => setShowConcept(!showConcept)} />
      
      <main className="flex-1 pb-24 pt-4 px-4 overflow-y-auto">
        {showConcept ? <ConceptModal onClose={() => setShowConcept(false)} /> : renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const ConceptModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100 mb-8 animate-in fade-in slide-in-from-bottom-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-extrabold text-indigo-900">🚀 Concept Guide</h2>
      <button onClick={onClose} className="text-slate-400">✕</button>
    </div>
    
    <div className="space-y-4 text-sm text-slate-600">
      <section>
        <h3 className="font-bold text-slate-800">Nomes sugeridos:</h3>
        <ul className="list-disc ml-4">
          <li><strong>CourtClash</strong> (vencedor)</li>
          <li>MatchPoint Pro</li>
          <li>RacketPulse</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-slate-800">Descrição App Store:</h3>
        <p>"Domine a quadra! CourtClash é o app definitivo para jogadores de Tênis, Beach Tennis e Padel. Encontre adversários do seu nível, suba nas ligas globais e transforme cada partida em uma jornada épica de evolução."</p>
      </section>

      <section>
        <h3 className="font-bold text-slate-800">Stack Recomendada:</h3>
        <p><strong>Frontend:</strong> React + Tailwind + Capacitor (iOS/Android).<br/><strong>Backend:</strong> Supabase (Auth, Postgres, Realtime).<br/><strong>Infra:</strong> Vercel + GitHub Actions.</p>
      </section>

      <section>
        <h3 className="font-bold text-slate-800">Monetização:</h3>
        <ul className="list-disc ml-4">
          <li><strong>Premium Matchmaking:</strong> Filtros avançados de nível.</li>
          <li><strong>Sponsorship:</strong> Clubes exibem quadras disponíveis no feed.</li>
          <li><strong>Tournament SaaS:</strong> Organizadores pagam para gerenciar ligas no app.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-bold text-slate-800">Lançamento:</h3>
        <p>Focar em 1 cidade (ex: SP), parcerias com 3 grandes arenas de Beach Tennis, oferta de 1 mês grátis premium para professores influenciadores.</p>
      </section>
    </div>
  </div>
);

export default App;
