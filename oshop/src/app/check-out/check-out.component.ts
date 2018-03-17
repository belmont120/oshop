import { Subscription } from 'rxjs/Subscription';
import { ShoppingCart } from './../models/app-shopping-cart';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  cart: ShoppingCart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  private async getCart() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
