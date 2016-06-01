import { Component, OnInit, OnDestroy, Injectable, Inject } from '@angular/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { Response } from "@angular/http";
import { UtilityService } from "../shared/utility.service";
import { Narration, NarrationService } from "../shared/narration.service";
import { environment } from "../";
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-hotels',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'hotels.component.html'
})

@Injectable()

export class HotelsComponent implements OnInit, OnDestroy {

  hotelForm: ControlGroup;
  utility: UtilityService;
  private _narrations: NarrationService;
  data;
  error;

  constructor(fb: FormBuilder, utility: UtilityService, narrationService: NarrationService) {
    this.hotelForm = fb.group({
       'description': [''],
       'location':  ['']
    });
    this.utility = utility;
    this._narrations = narrationService;
  }

  ngOnInit() {
      this._narrations.add("Entered Hotels component", "You navigated to the Hotels search form");
  }

  ngOnDestroy() {
      this._narrations.clear();
  }

  findHotels(value: any): void {
      var location = value.location;
      var description = value.description;

      var url = environment.baseApiUrl + "/api/hotel/";
      var hasDescription = (description != null && description != "");
      var hasLocation = (location != null && location != "");
      if (hasDescription && hasLocation) {
          url = url + description + "/" + location + "/";
      } else if (hasLocation) {
          url = url + "*/" + location + "/";
      } else if (hasDescription) {
          url = url + description + "/"
      }

      this._narrations.addPre("GET to " + url, "The search parameters were:", JSON.stringify(value));

    this.utility.makeGetRequestObs(url, [])
    .map((response: Response) => response.json())
    .subscribe(
        (val) => {
            this.data = val;
            this.error = null;

            let executedQuery = {"query":{"conjuncts": [
    {"field":"type","term":"landmark"},
    {"disjuncts":[
        {"field":"country","match_phrase":"France"},
        {"field":"city","match_phrase":"France"},
        {"field":"state","match_phrase":"France"},
        {"field":"address","match_phrase":"France"}
    ]},
    {"field":"content","match":"hotel"},
    {"disjuncts":[
        {"field":"content","match_phrase":"golf"},
        {"field":"name","match_phrase":"golf"}
    ]}
]},
"size":100};

            this._narrations.addPre("SUCCESS: Found " + val.length + " matching hotels", "The following FTS query was executed in the backend:", JSON.stringify(executedQuery, null, 2));
        },
        (error: Response) => {
            this.data = null;
            this.error = error.json();
            this._narrations.add("ERROR", error.json());
        }
    );
  }
}