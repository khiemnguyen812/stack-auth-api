/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { createProductDto, updateProductDto } from 'src/dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    getProductById(id: number): Promise<Product> {
        return this.productRepository.findOne({ where: { id } });
    }

    async createProduct(createProductDto: createProductDto): Promise<Product> {
        try {
            const product = this.productRepository.create(createProductDto);
            return await this.productRepository.save(product);
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    }

    async update(id: number, updateProductDto: updateProductDto): Promise<Product> {
        await this.productRepository.update(id, updateProductDto);
        return this.getProductById(id);
    }


    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }
}