import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.CONECTION_MONGO_DB,
      apiKey: process.env.API_KEY,
    },
  };
});
