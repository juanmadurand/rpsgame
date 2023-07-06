'use client';

import { PlayerScore } from '@/types';
import { createContext } from 'react';

export type GameContextType = {
  player: string;
  leaderBoard: PlayerScore[];
  score: PlayerScore | null;
};

export const GameContext = createContext<GameContextType | null>(null);

export const GameContextProvider = ({
  children,
  player,
  leaderBoard,
  score,
}: React.PropsWithChildren<GameContextType>) => {
  return (
    <GameContext.Provider
      value={{
        player,
        leaderBoard,
        score,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
