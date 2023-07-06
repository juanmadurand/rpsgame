import { getLeaderBoard } from '@/services/leaderboard';
import { NextResponse } from 'next/server';

export async function GET() {
  const leaderboard = await getLeaderBoard();
  return NextResponse.json(leaderboard);
}
