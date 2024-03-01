import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {getUser} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (getUser() && getUser().access_token != null && getUser().access_token !== "" && getUser().access_token !== undefined) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
