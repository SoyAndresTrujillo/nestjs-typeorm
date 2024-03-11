import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configEnv: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const API_KEY = this.configEnv.database.apiKey;
    const URL = this.configEnv.database.url;
    const PORT = this.configEnv.database.port;
    return `Hello World!, that is my API_KEY: ${API_KEY} and CONECTION_MONGO_DB: ${URL} and port ${PORT}`;
  }

  getTask() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * from tasks', (err, resp) => {
        if (err) reject(err);
        resolve(resp.rows);
      });
    });
  }
}
