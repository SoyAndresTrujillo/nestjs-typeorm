import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
// import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    const product = this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // create(data: CreateProductDto) {
  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, changes: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   const index = this.products.findIndex((item) => item.id === id);
  //   this.products[index] = {
  //     ...product,
  //     ...changes,
  //   };
  //   return this.products[index];
  // }

  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }
}
