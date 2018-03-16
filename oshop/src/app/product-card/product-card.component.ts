import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/app-product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product')product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;

  constructor() { }

  ngOnInit() {
  }

}
