import { UserService } from '../shared/services/user.service';
import { AppUser } from '../shared/models/app-user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/app-shopping-cart';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  // shoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = (await this.shoppingCartService.getCart());
  }

  toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.auth.logout();
  }


}
