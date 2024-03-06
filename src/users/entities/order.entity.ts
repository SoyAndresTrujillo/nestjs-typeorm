import { User } from './user.entity';
import { Product } from '../../products/entities/product.entity';

// the entities no has injectes
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
