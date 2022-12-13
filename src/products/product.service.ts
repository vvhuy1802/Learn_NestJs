import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from '../dto/products.dto';

export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findProductById = async (id: string): Promise<Product> => {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  };

  async getOne(id: string): Promise<Product> {
    const product = await this.findProductById(id);
    return product as Product;
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    if (!updatedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    return deletedProduct;
  }

  async deleteAll(): Promise<Product> {
    const deletedProduct = await this.productModel.deleteMany();
    if (!deletedProduct) {
      throw new NotFoundException('Could not find product.');
    }
    return deletedProduct as unknown as Product;
  }
}
