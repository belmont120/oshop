import { switchMap } from 'rxjs/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../models/app-product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category;

  subscription: Subscription;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) { }

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

    this.categories$ = this.categoryService.getAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
