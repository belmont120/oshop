import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from '../models/app-order';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  getAll(): Observable<Order[]> {
    return this.db.list('/orders')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val()}));
      });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).valueChanges();
  }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
