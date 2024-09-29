/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body, Put, Delete, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto, updateProductDto } from 'src/dto/product.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatus, HttpMessage } from 'src/global/gobal.Enum';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get()
  async getAllProducts() {
    try {
      const data = await this.productService.getAllProducts();
      return new ResponseData(
        HttpStatus.SUCCESS,
        data,
        HttpMessage.SUCCESS
      );
    } catch (error) {
      return new ResponseData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        [],
        HttpMessage.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    try {
      const data = await this.productService.getProductById(+id);
      if (!data) {
        return new ResponseData(
          HttpStatus.NOT_FOUND,
          [],
          HttpMessage.NOT_FOUND
        );
      }
      return new ResponseData(
        HttpStatus.SUCCESS,
        data,
        HttpMessage.SUCCESS
      );
    } catch (error) {
      return new ResponseData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        [],
        HttpMessage.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post()
  async createProduct(@Body(new ValidationPipe()) createProductDto: createProductDto) {
    try {
      const data = await this.productService.createProduct(createProductDto);
      return new ResponseData(
        HttpStatus.CREATED,
        data,
        HttpMessage.CREATED
      );
    } catch (error) {
      return new ResponseData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        [],
        HttpMessage.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body(new ValidationPipe()) updateProductDto: updateProductDto) {
    try {
      const data = await this.productService.update(+id, updateProductDto);
      return new ResponseData(
        HttpStatus.SUCCESS,
        data,
        HttpMessage.SUCCESS
      );
    } catch (error) {
      return new ResponseData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        [],
        HttpMessage.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: number) {
    try {
      await this.productService.remove(+id);
      return new ResponseData(
        HttpStatus.SUCCESS,
        [],
        HttpMessage.SUCCESS
      );
    } catch (error) {
      return new ResponseData(
        HttpStatus.INTERNAL_SERVER_ERROR,
        [],
        HttpMessage.INTERNAL_SERVER_ERROR
      );
    }
  }
}