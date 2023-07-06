import { redirect } from 'next/navigation';
import HomeClient from './client';
import { getPlayer } from '@/utils/server';

export default async function Home() {
  const player = getPlayer();

  if (!player) {
    redirect('/login');
  }

  return <HomeClient player={player} />;
}
