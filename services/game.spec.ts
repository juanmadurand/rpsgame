import { Weapons } from '@/config/weapons';
import { playGame, timeoutGame } from './game';
import { Db, MongoClient } from 'mongodb';

describe('Game', () => {
  let connection: MongoClient;
  let db: Db;
  const player = 'John';
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DATABASE_URL);
    db = await connection.db();
  });

  afterEach(async () => {
    await db.dropCollection('games');
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should create a game entry when playing', async () => {
    const result = await playGame(player, Weapons[0]);

    const plays = await db.collection('games').find({}).toArray();

    // Assert that register was created in MongoDb
    expect(plays.length).toBe(1);
    expect(plays[0].result).toBe(result);
    expect(plays[0].player).toBe(player);
    expect(plays[0].weapon).toBe(Weapons[0].type);
  });

  it('Should create a game entry when timeout', async () => {
    const result = await timeoutGame(player);

    const plays = await db.collection('games').find({}).toArray();

    // Assert that register was created in MongoDb
    expect(plays.length).toBe(1);
    expect(plays[0].result).toBe(result);
    expect(plays[0].player).toBe(player);
    expect(plays[0].weapon).toBe(null);
  });
});
