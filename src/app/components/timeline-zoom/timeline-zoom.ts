import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'wot-timeline-zoom',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './timeline-zoom.html',
  styleUrl: './timeline-zoom.scss',
})
export class TimelineZoom {
  zoomModes = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];
  
  selectedZoomMode: string = '';

}
