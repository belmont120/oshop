import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/app-product';
import { ShoppingCart } from '../models/app-shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product')product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
}
