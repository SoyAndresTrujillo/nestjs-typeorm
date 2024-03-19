import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from '../config';

const API_KEY_QA = 'key qa';
const API_KEY_PROD = 'key prod';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, database, password, port } = configService.postgres;
        return {
          type: 'postgres',
          username: user,
          host,
          database,
          password,
          port,
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
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
  exports: ['API_KEY_ENVIROMENT', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
