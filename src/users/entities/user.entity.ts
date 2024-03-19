import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

import { Customer } from './customer.entity';
import { Name } from './name.entity';
import { Date } from './date.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column(() => Date)
  date: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer: Customer;
}
