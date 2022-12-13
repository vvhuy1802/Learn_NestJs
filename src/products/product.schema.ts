import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  public name: string;

  @Prop()
  public price: number;

  @Prop()
  public description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
