import 'dotenv/config'
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const migrations = {
  extension: "mjs",
  loadExtensions: ['.mjs'],
  tableName: 'knex_migrations',
  directory: './src/database/migrations'
};

export const development = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations
};

export const staging = {
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations
};

export const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations
};