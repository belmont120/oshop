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
  subscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  save(order) {
    order.datePlaced = new Date().getTime();
    order.cart = this.cart;
    console.log(order);
    // this.orderService.create(order);

    // this.router.navigate(['/admin/products']);
  }
}
