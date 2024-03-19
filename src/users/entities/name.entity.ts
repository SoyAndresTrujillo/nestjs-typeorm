import { Column } from 'typeorm';

export class Name {
  @Column({ type: 'varchar', length: 255 })
  first: string;

  @Column({ type: 'varchar', length: 255 })
  last: string;
}
