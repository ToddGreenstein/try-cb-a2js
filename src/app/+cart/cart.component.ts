import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService, IUser, UtilityService } from '../shared';
import { environment } from '../';

@Component({
  moduleId: module.id,
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {

  authService: AuthService;
  utility: UtilityService;
  error: string;
  added: Array<any>;

  constructor(authService: AuthService, utility: UtilityService) {
      this.authService = authService;
      this.utility = utility;
  }

  ngOnInit() {
  }

  createFakeBooking() {
      let flight = {
          "username": this.authService.getUser(),
          "flights": [ {
              "name": "Fake Flight",
              "date": "6/23/2016",
              "sourceairport": "CDG",
              "destinationairport": "SFO"
          } ]
      };
      return this.utility.makePostRequest(environment.baseApiUrl + "/api/user/flights", [], flight).then((response: any) => {
          let result = response.data as any;
          this.added = result.added;
          this.error = null;
      }, (error) => {
          this.added = null;
          this.error = error;
      });
  }

}
