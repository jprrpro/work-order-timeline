import { Component, inject, OnInit } from '@angular/core';
import { TimelineService } from '../../services/timeline.service';
import { JsonPipe } from '@angular/common';
import { ZoomLevel } from '../../models/timeline';



@Component({
  selector: 'wot-timeline-header',
  imports: [],
  templateUrl: './timeline-header.html',
  styleUrl: './timeline-header.scss',
})
export class TimelineHeader implements OnInit {
  timelineService = inject(TimelineService);
  zoomLevel: ZoomLevel = 'day';
  headers: string[] = [];
  
  ngOnInit(): void {
    this.updateHeaders();
  }

  onZoomChange(newLevel: ZoomLevel) {
    this.zoomLevel = newLevel;
    this.updateHeaders();
  }

  updateHeaders() {
    this.headers = this.timelineService.timelineLabels();
  }
}
