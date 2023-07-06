import Head from 'next/head';
import { redirect } from 'next/navigation';
import LoginClient from './client';
import { getPlayer } from '@/utils/server';

export default function Login() {
  const player = getPlayer();
  if (player) {
    redirect('/');
  }

  return (
    <>
      <Head>
        <title>RPS Game - Login</title>
        <meta name="description" content="RPS Game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginClient />
    </>
  );
}
