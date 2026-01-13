import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TimelineService, ZoomLevel } from '../../services/timeline.service';
import { SidePanelService } from '../../services/side-panel';
import { WorkCenter } from '../../models/work-center.model';


@Component({
  selector: 'wot-timeline-row',
  imports: [],
  templateUrl: './timeline-row.html',
  styleUrl: './timeline-row.scss',
})
export class TimelineRow implements OnInit {
  timelineService = inject(TimelineService);
  sidePanelService = inject(SidePanelService);
  rowHeight = input<number>(48);
  workCenter = input<WorkCenter>();
  columns = signal<string[]>([]);
  
  ngOnInit(): void {
    this.columns.set(this.timelineService.timelineLabels());
  }

  openCreationPanel() {
    const workCenterId = this.workCenter()?.docId;    
    this.sidePanelService.open({workCenterId});
  }
}
