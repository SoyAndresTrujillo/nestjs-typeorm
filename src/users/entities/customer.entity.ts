import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';

import { User } from './user.entity';
import { Name } from './name.entity';
import { Date } from './date.entity';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: number;

  @Column(() => Name)
  name: Name;

  @Column(() => Date)
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
}
