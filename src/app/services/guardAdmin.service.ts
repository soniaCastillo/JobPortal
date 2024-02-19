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
export class GuardAdminService implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
          
    return this.authService.isAdministrator().then((condition: boolean) => {
      if (condition) {
          return true; // Allow access to the route
      } else {
            // Redirect or handle the condition failure appropriately
        this.router.navigate(['/']);
          return false; // Deny access to the route
        }
      }).catch(() => {
          // Handle errors from the additional condition check
        this.router.navigate(['/']);
        return false; // Deny access to the route
      });
     
    
  }
}