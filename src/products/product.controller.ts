import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../dto/products.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get all products
  @Get('all')
  async getAll() {
    return this.productService.findAll();
  }

  //get product by id
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.productService.getOne(id);
  }

  //create product
  @Post('create')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  //update product
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  //delete product
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  //delete all products
  @Delete('delete')
  async deleteAll() {
    return this.productService.deleteAll();
  }
}
