import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}
  findAll() {
    return this.brandRepository.find();
  }

  async findOne(id: number) {
    const product = await this.brandRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);
    return this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, changes);
    return this.brandRepository.save(brand);
  }

  remove(id: number) {
    this.brandRepository.delete(id);
  }
}
