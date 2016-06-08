import { Component, Injectable, Inject  } from '@angular/core';
import { AuthService } from './';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent {
  authService:AuthService;
  router:Router;

  constructor(authService:AuthService,router:Router) {
    this.authService=authService;
    this.router=router;
    if(!this.authService.isAuthenticated()){
      this.router.navigate(["login"]);
    }
  }
}
