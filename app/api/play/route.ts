import { Weapons } from '@/config/weapons';
import { playGame, timeoutGame } from '@/services/game';
import { getPlayer } from '@/utils/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const player = getPlayer();
  if (!player) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const timeout = searchParams.get('timeout');
  if (timeout) {
    const result = await timeoutGame(player);

    return NextResponse.json({ result });
  }

  const weaponType = searchParams.get('weaponType');
  const weapon = Weapons.find(w => w.type === weaponType);

  if (!weapon) {
    return NextResponse.json({ error: 'Invalid or missing weapon' }, { status: 400 });
  }

  const result = await playGame(player, weapon);

  return NextResponse.json({ result });
}
