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
            this.data = val.data;

            //we expect 2 context requests
            if (val.context.length == 2) {
                this._narrations.addPre("FTS query executed in the backend", "The following FTS query was executed in the backend:", val.context[0]);
                this._narrations.addPre("Subdocument query executed in the backend", "The following subdocument fetch was executed in the backend:", val.context[1]);
                this._narrations.add("SUCCESS", "Found " + this.data.length + " matching hotels");
            } else {
                this._narrations.fallbackPre(2, "SUCCESS (found " + this.data.length + " matching hotels)", val.context);
            }


        },
        (error: Response) => {
            this.data = null;
            this.error = error.json();
            if (this.error.failure) {
                this.error = this.error.failure;
            }
            this._narrations.addPre("ERROR", "There was an error:", JSON.stringify(this.error, null, 2));
        }
    );
  }
}