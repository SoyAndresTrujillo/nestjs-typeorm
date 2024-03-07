import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

const API_KEY_QA = 'key qa';
const API_KEY_PROD = 'key prod';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY_ENVIROMENT',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY_QA,
    },
  ],
})
export class AppModule {}
