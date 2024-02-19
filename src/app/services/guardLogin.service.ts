import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable({ providedIn: 'root' })
export class GuardLoginService implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.isAuthenticated().then((auth: boolean | undefined) => {
      if (auth === true) {
          return true;
      } else {
        this.router.navigate(['/']); // Redirect to the root route if not authenticated
        return false; // Deny access to the route
      }
    }).catch(() => {
      this.router.navigate(['/']); // Redirect to the root route if isAuthenticated() throws an error
      return false; // Deny access to the route
    });
  }
}