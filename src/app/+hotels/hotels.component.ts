import { Component, OnInit, Injectable, Inject } from '@angular/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { Response } from "@angular/http";

import { UtilityService } from "../shared/utility.service";
import { environment } from "../";
import { Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-hotels',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'hotels.component.html'
})

@Injectable()

export class HotelsComponent implements OnInit {

  hotelForm: ControlGroup;
  utility: UtilityService;
  data;
  error;

  constructor(fb: FormBuilder, utility: UtilityService) {
    this.hotelForm = fb.group({
       'description': [''],
      'location':  ['']
    });
    this.utility = utility;
  }

  ngOnInit() {
  }

  findHotels(value: any): void {
    console.log('you searched for hotel:', value);
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

    this.utility.makeGetRequestObs(url, [])
    .map((response: Response) => response.json())
    .subscribe(
        (success) => {
            console.log("DEBUG: found " + success.length + " matching hotels");
            this.data = success;
            this.error = null;
        },
        (error: Response) => {
            this.data = null;
            this.error = error.json();
        }
    );
  }
}