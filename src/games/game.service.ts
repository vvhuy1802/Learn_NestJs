import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Game, GameDocument } from './game.schema';
import { CreateGameDto } from '../dto/games.dto';
import { Product, ProductDocument } from 'src/products/product.schema';

export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  getAllProduct = async (id: string[]): Promise<any> => {
    const product = [];
    for (let i = 0; i < id.length; i++) {
      const products = await this.productModel.findById(id[i]).exec();
      product.push(products);
    }
    return product;
  };

  async getAllGame(): Promise<
    Array<{
      Game: Game;
      ItemDetails: Product[];
    }>
  > {
    const games = await this.gameModel.find().exec();
    const game = [];
    for (let i = 0; i < games.length; i++) {
      const products = await this.getAllProduct(games[i].idItem);
      game.push({
        Game: games[i],
        ItemDetails: products,
      });
    }
    return game;
  }

  async test(name: string): Promise<any> {
    return name;
  }

  async getOneGame(id: string): Promise<any> {
    const game = await this.findGameById(id);
    const products = await this.getAllProduct(game.idItem);
    return {
      Game: game,
      ItemDetails: products,
    };
  }
  findGameById = async (id: string): Promise<Game> => {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException('Could not find game.');
    }
    return game as Game;
  };

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const createdGame = new this.gameModel(createGameDto);
    const idItem = createdGame.idItem;
    const errorIndex = [];
    for (let i = 0; i < idItem.length; i++) {
      const product = await this.productModel.findById(idItem[i]).exec();
      if (!product) {
        errorIndex.push(i);
      }
    }
    if (errorIndex.length > 0) {
      throw new NotFoundException(
        'Could not find product with index ' + errorIndex,
      );
    } else {
      return createdGame.save();
    }
  }

  async updateGame(id: string, updateGameDto: CreateGameDto): Promise<Game> {
    const updatedGame = await this.gameModel.findByIdAndUpdate(
      id,
      updateGameDto,
      { new: true },
    );
    if (!updatedGame) {
      throw new NotFoundException('Could not find game.');
    }
    return updatedGame;
  }

  async deleteGame(id: string): Promise<Game> {
    const deletedGame = await this.gameModel.findByIdAndDelete(id);
    if (!deletedGame) {
      throw new NotFoundException('Could not find game.');
    }
    return deletedGame;
  }
}
