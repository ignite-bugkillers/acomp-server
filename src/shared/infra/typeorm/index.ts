import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function createDatabaseConnection(): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  if (process.env.NODE_ENV === 'test') {
    Object.assign(defaultOptions, {
      database: 'acomp_test',
    });
  }

  return createConnection(defaultOptions);
}
