import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from './services/generalServices/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const path = route.url[0].path;
    const loggedIn = this.sessionService.loggedIn();
    let canActivate = true;
    if (path === 'login' && loggedIn) {
      this.router.navigate(['/main']);
      canActivate = false;
    }
    else if (path === 'main' && !loggedIn) {
      this.router.navigate(['/login']);
      canActivate = false;
    }
    return canActivate;
  }
}