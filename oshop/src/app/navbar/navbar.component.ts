import { UserService } from './../services/user.service';
import { AppUser } from './../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  appUser: AppUser;
  cart$;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    (await this.shoppingCartService.getCart()).valueChanges()
      .subscribe(cart => {
        this.shoppingCartItemCount = 0;
        for (const productId in cart.items) {
          if (cart.items[productId]) {
            this.shoppingCartItemCount += cart.items[productId].quantity;
          }
        }
    });
  }

  toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout();
  }


}
