import { cookies } from 'next/headers';

export function getPlayer() {
  const cookieStore = cookies();
  return cookieStore.get('player')?.value;
}
