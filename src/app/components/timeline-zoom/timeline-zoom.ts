import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ZoomLevel } from '../../models/timeline';
import { TimelineService } from '../../services/timeline.service';

@Component({
  selector: 'wot-timeline-zoom',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './timeline-zoom.html',
  styleUrl: './timeline-zoom.scss',
})
export class TimelineZoom {
  timelineService = inject(TimelineService);


  zoomModes = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];
  
  selectedZoomMode: string = 'day';


  onZoomChange(newLevel: ZoomLevel) {
    this.timelineService.currentZoom.set(newLevel);
    this.timelineService.timelineLabels();
  }

}
