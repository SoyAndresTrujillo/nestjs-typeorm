import { Module, Global } from '@nestjs/common';

const API_KEY_QA = 'key qa';
const API_KEY_PROD = 'key prod';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY_ENVIROMENT',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_QA,
    },
  ],
  exports: ['API_KEY_ENVIROMENT'],
})
export class DatabaseModule {}
