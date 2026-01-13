import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { WorkCenterService } from '../../services/work-center.service';
import { WorkCenter } from '../../models/work-center.model';
import { TimelineBaseDocument } from '../../models/timeline';

@Component({
  selector: 'wot-work-center-list',
  imports: [],
  templateUrl: './work-center-list.html',
  styleUrl: './work-center-list.scss',
})
export class WorkCenterList implements OnInit {
  workCenterService = inject(WorkCenterService);
  workCenters = signal<(WorkCenter | TimelineBaseDocument)[]>([]);

  ngOnInit(): void {
    // console.log(this.workCenterService.test());
    // this.workCenterService.test().subscribe(x => console.log(x))

    this.workCenters = this.workCenterService.workCenters;
  }
}
