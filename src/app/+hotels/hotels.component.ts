import { Component, OnInit, Injectable, Inject } from '@angular/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';
import { UtilityService } from "../shared/utility.service";
import { environment } from "../";


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

  constructor(fb: FormBuilder, utility: UtilityService) {
    this.hotelForm = fb.group({
       'description': [''],
      'location':  ['']
    });
    this.utility = utility;
  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    console.log('you searched for hotel:', value);
    var location = value.location;
    var description = value.description;

    var url = environment.baseApiUrl + "/api/hotel/";
    if (description != null && description != "") {
        url = url + description + "/";
        if (location != null && location != "") {
            url = url + location + "/";
        }
    }

    this.utility.makeGetRequestObs(url, [])
    .subscribe(
        (success) => { console.log(success); },
        (error) => { console.log(error.json()); }
    );
  }
}