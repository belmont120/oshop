import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/app-shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/check-out']);
  }
 }
