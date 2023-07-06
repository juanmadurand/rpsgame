import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomeClient from './client';

export default function Home() {
  const cookieStore = cookies();
  const displayName = cookieStore.get('displayName')?.value;

  if (!displayName) {
    redirect('/login');
  }

  return <HomeClient displayName={displayName} />;
}
