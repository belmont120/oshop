import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operator/switchMap';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .switchMap(user => this.userService.get(user.uid).valueChanges())
      .map(appUser => appUser.isAdmin);
  }
}
