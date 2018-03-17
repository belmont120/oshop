import { AuthService } from './../services/auth.service';
import { AppUser } from './../models/app-user';
import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/app-shopping-cart';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/app-order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  order: Order = <Order>{};
  cart: ShoppingCart;
  appUser: AppUser;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) {
  }

  private async getCart() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscriptions.push(cart$.subscribe(cart => this.cart = cart));
  }

  private getAppUser() {
    const appUser$ = this.authService.appUser$;
    this.subscriptions.push(appUser$.subscribe(user => this.appUser = user));
  }

  ngOnInit() {
    this.getCart();
    this.getAppUser();
  }

  ngOnDestroy() {
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  async placeOrder(order) {
    order.datePlaced = new Date().getTime();
    order.cart = this.cart;
    order.appUser = this.appUser;

    const result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }
}
