import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY_ENVIROMENT') private API_KEY_ENVIROMENT: string,
  ) {}
  getHello(): string {
    return `Hello World! ${this.API_KEY_ENVIROMENT}`;
  }
}
