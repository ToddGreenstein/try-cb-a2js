import { Component, OnInit } from '@angular/core';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/components/typeahead';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  typeaheadLoading:boolean = false;
  typeaheadNoResults:boolean = false;

  

  constructor() {}

  ngOnInit() {
  }

}
