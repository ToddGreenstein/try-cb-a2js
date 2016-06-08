import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { UtilityService } from '../shared';
import { environment } from "./../../app/";
import { AuthService } from '../shared';
import { TYPEAHEAD_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  directives: [TYPEAHEAD_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    public auth:AuthService;
    public utility:UtilityService;
    public to:string = '';
    public from:string = '';
    public typeaheadLoading:boolean = false;
    public typeaheadNoResults:boolean = false;
    private _cache:any;
    private _prevContext:any;

    constructor(auth:AuthService,utility:UtilityService) {
      this.auth=auth;
      this.utility=utility;
    }

    public getContext():any {
      return this;
    }

    public getToAirport(context:any):Function {
      this._prevContext = context;
      let f:Function = function ():Promise<string[]> {
        let p:Promise<string[]> = new Promise((resolve:Function) => {
          setTimeout(() => {
            context.utility.makeGetRequest(environment.devHost + "/api/airport/findAll",[context.auth.getToken(),context.to])
            .then((result) => { (result)
                return resolve(result);
              })
            }, 200);
        });
        return p;
      };
      this._cache = f;
      return this._cache;
    }

    public getFromAirport(context:any):Function {
      this._prevContext = context;
      let f:Function = function ():Promise<string[]> {
        let p:Promise<string[]> = new Promise((resolve:Function) => {
          setTimeout(() => {
            context.utility.makeGetRequest(environment.devHost + "/api/airport/findAll",[context.auth.getToken(),context.from])
            .then((result) => { (result)
                return resolve(result);
              })
            }, 200);
        });
        return p;
      };
      this._cache = f;
      return this._cache;
    }

    public changeTypeaheadLoading(e:boolean):void {
      this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e:boolean):void {
      this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e:any):void {
      console.log(`Selected value: ${e.item}`);
    }


  ngOnInit() {
  }

}
