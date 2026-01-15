
import { League, SportType, PlayStyle, Badge, MatchFormat } from './types';

export const LEAGUE_CONFIG = {
  [League.BRONZE]: { color: 'bg-orange-700', gradient: 'league-bronze', minPoints: 0, icon: '🥉' },
  [League.SILVER]: { color: 'bg-slate-400', gradient: 'league-silver', minPoints: 500, icon: '🥈' },
  [League.GOLD]: { color: 'bg-yellow-500', gradient: 'league-gold', minPoints: 1500, icon: '🥇' },
  [League.DIAMOND]: { color: 'bg-cyan-400', gradient: 'league-diamond', minPoints: 3500, icon: '💎' }
};

export const SPORT_ICONS = {
  [SportType.TENNIS]: '🎾',
  [SportType.BEACH_TENNIS]: '🏖️',
  [SportType.PADEL]: '🏸'
};

export const BADGES: Badge[] = [
  { id: 'b1', name: 'Batismo de Fogo', icon: '🔥', description: 'Primeira partida validada no app.', criteria: '1 Partida Validada' },
  { id: 'b2', name: 'Imbatível', icon: '⚡', description: 'Vença 10 partidas consecutivas.', criteria: '10 Vitórias Seguidas' },
  { id: 'b3', name: 'Desafiador Sênior', icon: '⚔️', description: 'Crie 50 desafios para a comunidade.', criteria: '50 Desafios Criados' },
  { id: 'b4', name: 'Mestre das Raquetes', icon: '👑', description: 'Jogue Tênis, Beach Tennis e Padel.', criteria: 'Jogar os 3 Esportes' },
  { id: 'b5', name: 'Socialite', icon: '🤝', description: 'Adicione 10 amigos na sua rede.', criteria: '10 Amigos' },
  { id: 'b6', name: 'Madrugador', icon: '🌅', description: 'Partida realizada antes das 08:00.', criteria: 'Jogo às 08:00' },
  { id: 'b7', name: 'Notívago', icon: '🌙', description: 'Partida realizada após as 21:00.', criteria: 'Jogo às 21:00' },
  { id: 'b8', name: 'Viajante', icon: '✈️', description: 'Jogue em uma cidade diferente da sua.', criteria: 'Jogo Fora de Casa' },
  { id: 'b9', name: 'Inabalável', icon: '🧱', description: 'Complete 100 partidas no total.', criteria: '100 Partidas' },
  { id: 'b10', name: 'Fair Play', icon: '🛡️', description: 'Nenhuma denúncia em 20 partidas.', criteria: '20 Jogos Limpos' }
];

export const INITIAL_USER: any = {
  id: 'user_1',
  name: 'Alex Silva',
  photo: 'https://picsum.photos/seed/alex/200',
  city: 'São Paulo, SP',
  sports: [SportType.TENNIS, SportType.PADEL],
  totalPoints: 1250,
  league: League.SILVER,
  rankings: {
    [SportType.TENNIS]: 452,
    [SportType.BEACH_TENNIS]: 0,
    [SportType.PADEL]: 128
  },
  friends: ['user_2', 'user_3'],
  playStyle: PlayStyle.BASELINER,
  unlockedBadges: ['b1', 'b4', 'b6'],
  preferences: {
    maxDistance: 10,
    preferredDays: ['Seg', 'Qua', 'Sáb'],
    preferredPeriods: ['Tarde', 'Noite'],
    playStyle: PlayStyle.BASELINER
  }
};

export const MOCK_CHALLENGES: any[] = [
  {
    id: 'ch_active',
    creatorId: 'user_1',
    creatorName: 'Alex Silva',
    creatorPhoto: 'https://picsum.photos/seed/alex/200',
    creatorLeague: League.SILVER,
    sport: SportType.TENNIS,
    format: MatchFormat.BEST_OF_3,
    location: 'Ibirapuera Park',
    date: 'Hoje, 14:00',
    isPrivate: false,
    status: 'accepted',
    opponentId: 'user_2',
    distance: 0,
    creatorPlayStyle: PlayStyle.BASELINER
  },
  {
    id: 'ch_1',
    creatorId: 'user_2',
    creatorName: 'Mariana Costa',
    creatorPhoto: 'https://picsum.photos/seed/mari/200',
    creatorLeague: League.GOLD,
    sport: SportType.TENNIS,
    format: MatchFormat.SINGLE_SET,
    location: 'PlayTennis Ibirapuera',
    date: 'Hoje, 18:00',
    isPrivate: false,
    status: 'open',
    distance: 3.2,
    creatorPlayStyle: PlayStyle.SERVE_VOLLEY
  },
  {
    id: 'ch_2',
    creatorId: 'user_3',
    creatorName: 'Ricardo J.',
    creatorPhoto: 'https://picsum.photos/seed/ric/200',
    creatorLeague: League.BRONZE,
    sport: SportType.BEACH_TENNIS,
    format: MatchFormat.BEST_OF_3,
    location: 'Arena Verão',
    date: 'Amanhã, 09:00',
    isPrivate: false,
    status: 'open',
    distance: 8.5,
    creatorPlayStyle: PlayStyle.DEFENSIVE
  }
];
