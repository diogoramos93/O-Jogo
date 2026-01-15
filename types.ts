
export enum SportType {
  TENNIS = 'Tênis',
  BEACH_TENNIS = 'Beach Tennis',
  PADEL = 'Padel'
}

export enum League {
  BRONZE = 'Bronze',
  SILVER = 'Prata',
  GOLD = 'Ouro',
  DIAMOND = 'Diamante'
}

export enum MatchFormat {
  SINGLE_SET = 'Set Único',
  BEST_OF_3 = 'Melhor de 3',
  PRO_SET = 'Pro Set (8 games)'
}

export enum PlayStyle {
  SERVE_VOLLEY = 'Saque e Voleio',
  BASELINER = 'Fundo de Quadra',
  ALL_COURT = 'All-Court',
  AGGRESSIVE = 'Agressivo',
  DEFENSIVE = 'Defensivo'
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  criteria: string;
  unlockedAt?: string;
}

export interface UserPreferences {
  maxDistance: number; // KM
  preferredDays: string[];
  preferredPeriods: string[];
  playStyle: PlayStyle;
}

export interface User {
  id: string;
  name: string;
  photo: string;
  city: string;
  sports: SportType[];
  totalPoints: number;
  league: League;
  rankings: Record<SportType, number>;
  friends: string[];
  playStyle: PlayStyle;
  preferences: UserPreferences;
  unlockedBadges: string[];
}

export interface MatchScore {
  player1: number[]; // Scores per set
  player2: number[];
}

export interface Challenge {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorPhoto: string;
  creatorLeague: League;
  sport: SportType;
  format: MatchFormat;
  location: string;
  date: string;
  isPrivate: boolean;
  status: 'open' | 'accepted' | 'pending_validation' | 'completed' | 'conflict' | 'canceled';
  distance?: number;
  creatorPlayStyle?: PlayStyle;
  opponentId?: string;
  reportedScore?: MatchScore;
  opponentReportedScore?: MatchScore;
}

export interface MatchResult {
  id: string;
  challengeId: string;
  player1Id: string;
  player2Id: string;
  score: string;
  winnerId: string;
  validated: boolean;
  reportedBy: string[];
}
