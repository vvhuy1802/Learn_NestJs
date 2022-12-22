import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from '../todos/todos.module';
import { ProductModule } from 'src/products/product.module';
import { GameModule } from 'src/games/game.module';

@Module({
  imports: [
    TodosModule,
    MongooseModule.forRoot('mongodb://localhost:27017/learn_nestjs'),
    ProductModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
