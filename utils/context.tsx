'use client';

import { MatchResult, PlayerScore, PlayerScoreValues } from '@/types';
import { createContext, useState } from 'react';

export type GameContextType = {
  player: string;
  leaderBoard: PlayerScore[];
  score: PlayerScore;
  updateScore: (result: MatchResult) => void;
};

export const GameContext = createContext<Partial<GameContextType> | null>(null);

type GameContextProps = React.PropsWithChildren<
  Pick<GameContextType, 'player' | 'leaderBoard' | 'score'>
>;

export const GameContextProvider = ({ children, player, leaderBoard, score }: GameContextProps) => {
  const [localScore, setLocalScore] = useState<PlayerScore>(score);
  console.log('localScore', localScore);
  return (
    <GameContext.Provider
      value={{
        player,
        leaderBoard,
        score: localScore,
        updateScore: (result: MatchResult) => {
          let key: keyof PlayerScoreValues;
          if (result === MatchResult.DRAW) {
            key = 'draws';
          } else if (result === MatchResult.WIN) {
            key = 'wins';
          } else if (result === MatchResult.LOSE) {
            key = 'losses';
          } else {
            return;
          }

          setLocalScore(prev => ({ ...prev, [key]: prev[key] + 1 }));
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
