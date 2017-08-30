import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AdminguardGuard implements CanActivate {
  constructor(public af: AngularFireAuth, private _Router: Router, private _Location: Location) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.af.authState.map(user => {
      if (user != null) {
        if (user.email == 'admin@gmail.com') {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        this._Router.navigate(['/admin']);
        return false;
      }
    })
  }
}