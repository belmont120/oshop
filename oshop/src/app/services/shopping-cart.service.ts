import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/app-product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/app-shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .map(action => {
        const key = action.key;
        const items = action.payload.val().items;
        return new ShoppingCart(key, items);
      });
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().take(1).subscribe(item => {
      if (((item.payload.val() ? item.payload.val().quantity : 0) + change) <= 0) {
        return item$.remove();
      }
      item$.update({ product: product, quantity: (item.payload.val() ? item.payload.val().quantity : 0) + change});
    });
  }
}
