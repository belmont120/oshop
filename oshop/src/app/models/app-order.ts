import { ShoppingCart } from './app-shopping-cart';
import { AppUser } from './app-user';

export interface Order {
    name: string;
    address: string;
    city: string;
    postcode: string;
    datePlaced: Date;
    shoppingCart: ShoppingCart;
    appUser: AppUser;
}
