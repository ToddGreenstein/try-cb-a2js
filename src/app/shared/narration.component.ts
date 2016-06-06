import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { Narration, NarrationService } from './narration.service'

@Injectable()
@Component({
  moduleId: module.id,
  selector: 'app-narration',
  templateUrl: 'narration.component.html',
  styleUrls: ['narration.component.css']
})
export class NarrationComponent implements OnInit {
  model: Narration[];
  selected: Narration;
  collapsed: boolean = true;
  expandedPre: boolean;
  showExpandPre: boolean;
  private _sharedService: NarrationService;

  constructor(sharedService: NarrationService) {
      this._sharedService = sharedService;
  }

  ngOnInit() {
      this.model = this._sharedService.dataArray;
      this.selected = this.model[0];
  }

  select(n: Narration) {
      this.selected = n;
      this.expandedPre = false;
      this.showExpandPre = n.pre && n.pre.split(/\r\n|\r|\n/).length > 4;
  }

  toggleCollapse() {
      this.collapsed = !this.collapsed;
  }

  expandPre() {
      this.expandedPre = !this.expandedPre;
  }

}