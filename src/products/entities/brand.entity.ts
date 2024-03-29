import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
