import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configEnv: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const API_KEY = this.configEnv.database.apiKey;
    const URL = this.configEnv.database.url;
    return `Hello World!, that is my API_KEY: ${API_KEY} and CONECTION_MONGO_DB: ${URL}`;
  }
}
