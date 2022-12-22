import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { GameService } from './game.service';
import { Game, GameSchema } from './game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  //get all games
  @Get('all')
  async getAllGame() {
    return this.gameService.getAllGame();
  }

  //test
  @Get('test')
  async test(@Query() data: any) {
    return data.status
  }

  //get game by id
  @Get('/:id')
  async getOneGame(@Param('id') id: string) {
    return this.gameService.getOneGame(id);
  }

  //update game by id
  @Patch('update/:id')
  async updateGame(@Param('id') id: string, @Body() game: Game) {
    return this.gameService.updateGame(id, game);
  }

  //delete game by id
  @Delete('delete/:id')
  async deleteGame(@Param('id') id: string) {
    return this.gameService.deleteGame(id);
  }

  // create game
  @Post('create')
  async createGame(@Body() game: Game) {
    return this.gameService.createGame(game);
  }
}
