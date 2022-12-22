import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './game.schema';
import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Product, ProductSchema } from 'src/products/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
