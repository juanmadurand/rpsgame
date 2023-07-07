export enum MatchResult {
  WIN = 'win',
  LOSE = 'lose',
  DRAW = 'draw',
}

export enum WeaponType {
  ROCK = 'rock',
  PAPER = 'paper',
  SCISSORS = 'scissors',
}
export type Weapon = {
  type: WeaponType;
  defeats: WeaponType[];
};

export type Match = {
  /** Player who played against computer */
  player: string;
  /** Match result */
  result: MatchResult;
  /** Weapon selected by player */
  weapon: string | null;
  /** Date of the match */
  created_at: Date;
};

export type PlayGameResult = {
  result: MatchResult;
  pcWeaponType: WeaponType;
  userWeaponType: WeaponType;
};

export type PlayerScoreValues = {
  wins: number;
  losses: number;
  draws: number;
};

export type PlayerScore = PlayerScoreValues & {
  player: string;
};
