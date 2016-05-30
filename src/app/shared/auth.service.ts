import { Injectable, Inject } from "@angular/core";
import { IUser } from "./interfaces";
import { UtilityService } from "./utility.service";

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
        this.utility.makeGetRequest("/api/user/login", [email, password]).then((result) => {
            if(result) {
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

  register(user: IUser) {
      return this.utility.makePostRequest("/api/user/login", [], user);
  }

  deAuthenticate() {
    localStorage.clear();
  }

  debugServiceLogin(email: string, password: string){
    localStorage.setItem("user","DEBUG");
  }
}
