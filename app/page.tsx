import { redirect } from 'next/navigation';
import { getPlayer } from '@/utils/server';
import { GameContextProvider } from '@/utils/context';
import HomeClient from './client';
import { getLeaderBoard } from '@/services/leaderboard';

export default async function Home() {
  const player = getPlayer();

  if (!player) {
    redirect('/login');
  }

  const leaderBoard = await getLeaderBoard();

  const userScore = leaderBoard.find(row => row.player === player) || {
    player,
    wins: 0,
    losses: 0,
    draws: 0,
  };

  return (
    <GameContextProvider player={player} leaderBoard={leaderBoard} score={userScore}>
      <HomeClient />
    </GameContextProvider>
  );
}
