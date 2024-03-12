import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.DATABASE_URL,
      apiKey: process.env.API_KEY_DEV,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10),
    },
  };
});
