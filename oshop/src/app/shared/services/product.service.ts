import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/app-product';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ key: action.key, ...action.payload.val()}));
      });
  }

  get(productId): Observable<Product> {
    return this.db.object('/products/' + productId )
      .snapshotChanges()
      .map(p => {
        const existingProduct = new Product();
        existingProduct.title = p.payload.val().title;
        existingProduct.price = p.payload.val().price;
        existingProduct.category = p.payload.val().category;
        existingProduct.imageUrl = p.payload.val().imageUrl;
        return existingProduct;
      });
  }

  update(productId, product) {
    return this.db.object('/products/' + productId ).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId ).remove();
  }
}
