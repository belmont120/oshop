import { ShoppingCart } from './app-shopping-cart';
import { AppUser } from './app-user';

export class Order {
    name: string;
    address: string;
    city: string;
    postcode: string;
    datePlaced: Date;
    cart: ShoppingCart;
    userId: string;
}
