import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'postgres',
  password: 'root123',
  port: 5431,
});

client.connect();
client.query('SELECT * from tasks', (err, resp) => {
  console.error(err);
  console.log(resp);
});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      validationSchema: Joi.object({
        API_KEY_DEV: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
      isGlobal: true,
    }),
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
