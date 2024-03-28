import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere, Between } from 'typeorm';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  PaginationProductDto,
} from '../dtos/products.dto';

import { Brand } from '../entities/brand.entity';

import { Category } from '../entities/category.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll(params?: PaginationProductDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;

      if (minPrice && maxPrice) where.price = Between(minPrice, maxPrice);

      return this.productRepository.find({
        relations: ['brand', 'categories'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepository.find({
      relations: ['brand', 'categories'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOneBy({ id: data.brandId });
      newProduct.brand = brand;
    }

    if (data.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async addCategoryToProduct(id: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    product.categories.push(category);
    return this.productRepository.save(product);
  }

  remove(id: number) {
    this.productRepository.delete(id);
  }

  async removeCategoryOfProdcut(id: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }
}
