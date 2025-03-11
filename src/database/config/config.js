module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      useUTC: false,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    },
    timezone: '+07:00',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      useUTC: false,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    },
    timezone: '+07:00',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      useUTC: false,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    },
    timezone: '+07:00',
  },
};
