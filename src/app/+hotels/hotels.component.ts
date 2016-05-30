import { Component, OnInit } from '@angular/core';
import {
  CORE_DIRECTIVES,
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-hotels',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  templateUrl: 'hotels.component.html'
})

export class HotelsComponent implements OnInit {
  hotelForm: ControlGroup;

  constructor(fb: FormBuilder) {
    this.hotelForm = fb.group({
      'location':  ['', Validators.required],
      'description': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any): void {
    console.log('you searched for hotel:', value);
  }
}