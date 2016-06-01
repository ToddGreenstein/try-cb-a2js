import { Injectable, Inject } from "@angular/core";
//import {Http, Request, RequestMethod, Headers, HTTP_PROVIDERS} from "@angular/http";
import { IUser } from "./interfaces";
import { UtilityService } from "./utility.service";
import { environment } from "./../../app/";

@Injectable()

export class AuthService {

  utility: UtilityService;

  constructor(utility: UtilityService) {
    this.utility = utility
  }

  isAuthenticated() {
    if (!localStorage.getItem("user") || localStorage.getItem("user") == "") {
      return false;
    } else {
      return true;
    }
  }

  getUser(){
    return localStorage.getItem("user");
  }

login(email: string, password: string) {
  return new Promise((resolve, reject) => {
    this.utility.makeGetRequest(environment.devHost + "/api/user/login", [email, password]).then((result) => {
      if (result) {
        localStorage.setItem("user", JSON.stringify(result));
        resolve(result);
      } else {
        reject("User not found");
      }
    }, (error) => {
      reject(error);
    });
  });
}

register(email: string, password:string) {
  let cUser:IUser = {user:email,password:password};
  return new Promise((resolve, reject) => {
    this.utility.makePostRequest(environment.devHost + "/api/user/login", [],cUser).then((result) => {
      if (result) {
        // Login
      } else {
        reject("Registration Failure");
      }
    }, (error) => {
      reject(error);
    });
  });
}
      // return this.utility.makePostRequest(environment.devHost + "/api/user/login", [], user);

  deAuthenticate() {
    localStorage.clear();
  }

  debugServiceLogin(email: string, password: string){
    localStorage.setItem("user","DEBUG");
  }
}
