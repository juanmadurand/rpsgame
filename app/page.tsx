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

  return (
    <GameContextProvider player={player} leaderBoard={leaderBoard} score={null}>
      <HomeClient />
    </GameContextProvider>
  );
}
