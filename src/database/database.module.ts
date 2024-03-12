import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

import config from '../config';
import { ConfigType } from '@nestjs/config';

const API_KEY_QA = 'key qa';
const API_KEY_PROD = 'key prod';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY_ENVIROMENT',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_QA,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY_ENVIROMENT', 'PG'],
})
export class DatabaseModule {}
