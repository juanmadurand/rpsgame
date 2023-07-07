import { Db, MongoClient } from 'mongodb';
import { getLeaderBoard } from './leaderboard';
import { WeaponType } from '@/types';

describe('Leaderboard', () => {
  let connection: MongoClient;
  let db: Db;
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DATABASE_URL);
    db = await connection.db();
  });

  afterAll(async () => {
    await db.dropCollection('games');
    await connection.close();
  });

  it('Should return sorted leaderboard', async () => {
    await db.collection('games').insertMany([
      {
        player: 'Alice',
        weapon: WeaponType.PAPER,
        created_at: new Date(),
        result: 'win',
      },
      {
        player: 'Alice',
        weapon: WeaponType.SCISSORS,
        created_at: new Date(),
        result: 'win',
      },
      {
        player: 'Alice',
        weapon: WeaponType.ROCK,
        created_at: new Date(),
        result: 'draw',
      },
      {
        player: 'Alice',
        weapon: WeaponType.SCISSORS,
        created_at: new Date(),
        result: 'lose',
      },
      {
        player: 'Bob',
        weapon: WeaponType.ROCK,
        created_at: new Date(),
        result: 'win',
      },
    ]);

    const scores = await getLeaderBoard();
    expect(scores.length).toBe(2);

    // Alice should come first since has more wins than Bob
    const [aliceScore, bobScore] = scores;

    expect(aliceScore.player).toBe('Alice');
    expect(aliceScore.wins).toBe(2);
    expect(aliceScore.losses).toBe(1);
    expect(aliceScore.draws).toBe(1);
    expect(bobScore.player).toBe('Bob');
    expect(bobScore.wins).toBe(1);
    expect(bobScore.losses).toBe(0);
    expect(bobScore.draws).toBe(0);
  });
});
