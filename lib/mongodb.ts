import { MongoClient } from 'mongodb';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
    }
  }
}

const client = new MongoClient(process.env.DATABASE_URL);

export const connectDatabase = async () => {
  await client.connect();
  const db = client.db();

  return db;
};
