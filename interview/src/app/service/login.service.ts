import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {LoginRequestDTO} from "../dto/LoginRequestDTO";
import {LOGIN_REQUEST} from "../../util/ConnectionUtil";
import {CURRENT_USER} from "../../util/constants";

export const getUser = () => JSON.parse(localStorage.getItem(CURRENT_USER));

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  sendLoginRequest(loginModel: LoginRequestDTO): Observable<any> {

    return this.http.post(LOGIN_REQUEST, loginModel)
      .pipe(
        map((response: any) => {
          if (response.success) {
            localStorage.setItem(CURRENT_USER, JSON.stringify(response));
            localStorage.setItem("username", loginModel.username)
            this.loggedIn.next(true);
          } else this.loggedIn.next(false);

          return response;
        }),
        catchError((error: any) => {
            return [false];
          }
        ));
  }

  public isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
