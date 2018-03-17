import { ShoppingCart } from './app-shopping-cart';

export interface Order {
    name: string;
    address: string;
    city: string;
    postcode: string;
    datePlaced: Date;
    shoppingCart: ShoppingCart;
}
