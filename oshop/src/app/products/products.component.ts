import { switchMap } from 'rxjs/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../models/app-product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart;
  category;

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.productService.getAll()
      .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
      });
  }

  async ngAfterViewInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
