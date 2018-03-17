import { ShoppingCartItem } from './app-shopping-cart-item';

export class ShoppingCart {

    constructor(public key: string, public items: ShoppingCartItem[]) {}

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items) {
          if (this.items[productId]) {
            count += this.items[productId].quantity;
          }
        }
        return count;
    }
}
