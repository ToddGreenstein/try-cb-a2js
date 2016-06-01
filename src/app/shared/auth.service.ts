import { Injectable, Inject } from "@angular/core";
import { IUser,IToken } from "./interfaces";
import { UtilityService } from "./utility.service";
import { environment } from "./../../app/";
import { md5 } from './md5';
import { JwtHelper } from './angular2-jwt';


@Injectable()
export class AuthService {

  utility: UtilityService;
  jwt: JwtHelper;

  constructor(utility: UtilityService) {
    this.utility = utility;
    this.jwt= new JwtHelper();
  }

  isAuthenticated() {
    if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
      return false;
    } else {
      return true;
    }
  }

  getUser(){
    if (localStorage.getItem("user")) {
            return localStorage.getItem("user");
        } else {
            return null;
        }
  }

login(email: string, password: string) {
  return new Promise((resolve, reject) => {
    this.utility.makeGetRequest(environment.devHost + "/api/user/login", [email, md5(password)]).then((result) => {
      if (result) {
        let cToken = result as IToken;
        if (cToken.status != "success") {
          reject(cToken.status);
        }
        localStorage.setItem("user", this.jwt.decodeToken(cToken.token).user);
        resolve();
      } else {
        reject("User Error");
      }
    }, (error) => {
      reject(error);
    });
  });
}

register(email: string, password:string) {
  let cUser: IUser = { user: email, password: md5(password) };
  return new Promise((resolve, reject) => {
    this.utility.makePostRequest(environment.devHost + "/api/user/login", [], cUser).then((result) => {
      if (result) {
        let cToken = result as IToken;
        if (cToken.status != "success") {
          reject(cToken.status);
        }
        localStorage.setItem("user", this.jwt.decodeToken(cToken.token).user);
        resolve();
      } else {
        reject("Registration Failure");
      }
    }, (error) => {
      reject(error);
    });
  });
}

  deAuthenticate() {
    localStorage.clear();
  }
}
