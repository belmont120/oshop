import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/observable';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/app-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit , OnDestroy, AfterViewInit {
  subscription: Subscription;
  displayedColumns = ['customer', 'date', 'city'];
  dataSource = new MatTableDataSource();
  userId: string;
  userSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.userSubscription = authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnInit() {
    this.subscription = this.orderService.getOrdersByUser(this.userId).subscribe(orders => {
      this.dataSource.data = orders;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
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

}
