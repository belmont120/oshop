import { ShoppingCartItem } from './app-shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public key: string, public itemsMap: {[productId: string]: ShoppingCartItem }) {
      for (const productId in itemsMap) {
        if ( productId ) {
          this.items.push(itemsMap[productId]);
        }
      }
    }

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
