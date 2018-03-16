import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/app-product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + 1});
      } else {
        item$.set({
          product: product,
          quantity: 1
        });
      }
    });
  }
}
