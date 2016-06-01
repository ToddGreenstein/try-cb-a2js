import { Component, Injectable, Inject  } from '@angular/core';
import { AuthService } from './';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  directives: [ROUTER_DIRECTIVES]
  //styleUrls: []
})

export class NavbarComponent {
  authService:AuthService;
  router:Router;
  isNew:Boolean;

  constructor(authService:AuthService,router:Router) {
    this.authService=authService;
    this.isNew=true;
    this.router=router;
  }
}
