import { Component, OnInit, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router'
import { AuthService, IUser, UtilityService } from '../shared';
import { environment } from "../";

@Injectable()
@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  directives: [ ROUTER_DIRECTIVES ]
})
export class UserComponent implements OnInit {
  authService: AuthService;
  user: string;
  error: any;
  booked: Array<any>;
  utility: UtilityService;

  constructor(authService: AuthService, utilityService: UtilityService) {
      this.authService = authService;
      this.utility = utilityService;
  }

  ngOnInit() {
      this.user = this.authService.getUser();

      var searchParams = "username=" + this.user;

      this.utility.makeGetRequestObs(environment.baseApiUrl, ["api", "user", "flights"], searchParams)
        .map((response: Response) => response.json())
        .subscribe(
        (val) => {
            this.booked = val.data;
            console.log("found booked flights: " + val.data);
        },
        (error: any) => {
            this.booked = null;
            this.error = error;
        }
    );
  }

}
