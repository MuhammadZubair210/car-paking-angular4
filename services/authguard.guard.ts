import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";
import 'rxjs/Rx';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(
    private router: Router,
    private af: AngularFireAuth) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.af.authState.map((user) => {
      if (user == null) {
        this.router.navigate(['/login']);
        return false;
      }

      else if (user != null && user.email != 'admin@admin.com') {
        console.log("else if");
        return true;
      }

      else {
        this.router.navigate(['/admin']);
        return true;
      }
    })
  }
}
