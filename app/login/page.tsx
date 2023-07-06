import Head from 'next/head';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginClient from './client';

export default function Login() {
  const cookieStore = cookies();
  const displayName = cookieStore.get('displayName')?.value;
  if (displayName) {
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
