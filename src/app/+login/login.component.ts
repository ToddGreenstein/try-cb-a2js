import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared';
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  authService:AuthService;
  isNew:boolean;
  loginError:string;
  username:string;
  password:string;
  router:Router;

  constructor(authService:AuthService,router:Router) {
    this.authService=authService;
    this.isNew=true;
    this.router=router
  }

  login(email:string,password:string,isNew:boolean){
    if(isNew){
      //this.authService.debugServiceLogin(email,password);

      this.authService.register(email,password);
      this.router.navigate(["home"]);
    }else{
      this.authService.login(email, password).then((result) => {
                this.router.navigate(["home"]);
            }, (error) => {
                console.error(error);
                this.loginError=error;
                this.username=null;
                this.password=null;
            });
        }
    }

  ngOnInit() {
  }

}
