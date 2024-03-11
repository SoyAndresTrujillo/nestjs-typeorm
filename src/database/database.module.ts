import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const API_KEY_QA = 'key qa';
const API_KEY_PROD = 'key prod';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  password: 'root123',
  port: 5431,
});

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY_ENVIROMENT',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_QA,
    },
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['API_KEY_ENVIROMENT', 'PG'],
})
export class DatabaseModule {}
