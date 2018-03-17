import { ShoppingCart } from './../models/app-shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/app-order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  order: Order = <Order>{};
  userId: string;
  subscription: Subscription;
  @Input('cart') cart: ShoppingCart;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.getAppUser();
  }

  private getAppUser() {
    const user$ = this.authService.user$;
    this.subscription = user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(order) {
    order.datePlaced = new Date().getTime();
    order.cart = this.cart;
    order.userId = this.userId;

    const result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }
}
