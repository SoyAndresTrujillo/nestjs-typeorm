import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configServide: ConfigService) {}
  getHello(): string {
    const API_KEY = this.configServide.get('API_KEY');
    const CONECTION_MONGO_DB = this.configServide.get('CONECTION_MONGO_DB');
    return `Hello World!, that is my API_KEY: ${API_KEY} and CONECTION_MONGO_DB: ${CONECTION_MONGO_DB}`;
  }
}
