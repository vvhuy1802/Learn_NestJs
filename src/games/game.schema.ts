import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema()
export class Game {
  @Prop()
  public name: string;

  @Prop()
  public idItem: string[];

  @Prop()
  public description: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
