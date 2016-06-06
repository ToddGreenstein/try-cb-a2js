import { Component } from '@angular/core';
import { HomeComponent } from './+home';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import { LoginComponent } from './+login';
import { UserComponent } from './+user';
import { CartComponent } from './+cart';
import { HotelsComponent } from './+hotels';
import { AuthService,UtilityService, NavbarComponent, NarrationComponent, Narration, NarrationService } from './shared';
import { Http, Request, RequestMethod, Headers, HTTP_PROVIDERS } from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'try-app',
  templateUrl: 'try.component.html',
  styleUrls: ['try.component.css'],
  directives: [ROUTER_DIRECTIVES, NavbarComponent, NarrationComponent],
  providers: [ROUTER_PROVIDERS,AuthService,UtilityService,NarrationService,HTTP_PROVIDERS]
})
@Routes([
  {path: '/home', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/user', component: UserComponent},
  {path: '/cart', component: CartComponent},
  {path: '/hotels', component: HotelsComponent}
])
export class TryAppComponent {
  router: Router;
  authService: AuthService;
  narrationService: NarrationService;

  constructor(router:Router,authService:AuthService, narrationService: NarrationService){
    this.authService=authService;
    this.router=router;
    if(!this.authService.isAuthenticated()){
      this.router.navigate(["login"]);
    }
    this.narrationService = narrationService;
  }
}
