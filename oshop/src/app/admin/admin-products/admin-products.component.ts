import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../shared/services/product.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../../shared/models/app-product';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  displayedColumns = ['title', 'price', 'key'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, private router: Router) {
  }
  ngOnInit() {
    // get the products from the product service and update the MatTableDataSource
    this.subscription = this.productService.getAll().subscribe(products => {
      this.dataSource.data = products;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    // assign paginator and sort
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  applyFilter(filterValue: string) {
    // get filter value and apply to MatTableDataSource
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addProduct() {
    this.router.navigate(['/admin/products/new']);
  }
}

