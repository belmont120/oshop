import { ShoppingCartItem } from './app-shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public key: string, public itemsMap: {[productId: string]: ShoppingCartItem }) {
      for (const productId in itemsMap) {
        if ( productId ) {
          const item = itemsMap[productId];
          this.items.push(new ShoppingCartItem(item.product, item.quantity));
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

    get totalPrice() {
      let sum = 0;
      for (const productId in this.items) {
        if (productId) {
          sum += this.items[productId].totalPrice;
        }
      }
      return sum;
    }
}
