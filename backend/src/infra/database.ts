/* eslint-disable @typescript-eslint/no-explicit-any */
import pg from "pg";

type QueryObject =
  | string
  | {
      text: string;
      values?: any[];
    };

async function query(queryObject: QueryObject): Promise<pg.QueryResult<any>> {
  let client: pg.Client | null = null;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (client) await client.end();
  }
}

async function getNewClient(): Promise<pg.Client> {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
