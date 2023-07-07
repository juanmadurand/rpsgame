import { connectDatabase } from '@/lib/mongodb';
import { PlayerScore } from '@/types';

export async function getLeaderBoard(): Promise<PlayerScore[]> {
  const db = await connectDatabase();
  const results = await db
    .collection('games')
    .aggregate([
      {
        $project: {
          player: 1,
          wins: {
            $cond: [{ $eq: ['$result', 'win'] }, 1, 0],
          },
          losses: {
            $cond: [{ $eq: ['$result', 'lose'] }, 1, 0],
          },
          draws: {
            $cond: [{ $eq: ['$result', 'draw'] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: '$player',
          wins: { $sum: '$wins' },
          losses: { $sum: '$losses' },
          draws: { $sum: '$draws' },
        },
      },
      {
        $sort: { wins: -1 },
      },
      { $limit: 10 },
    ])
    .toArray();

  return results.map(({ _id, ...result }) => ({
    player: _id,
    wins: result.wins,
    draws: result.draws,
    losses: result.losses,
  }));
}
