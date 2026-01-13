import { Component, inject, OnInit, signal } from '@angular/core';
import { TimelineService } from '../../services/timeline.service';
import { ZoomLevel } from '../../models/timeline';



@Component({
  selector: 'wot-timeline-header',
  imports: [],
  templateUrl: './timeline-header.html',
  styleUrl: './timeline-header.scss',
})
export class TimelineHeader implements OnInit {
  timelineService = inject(TimelineService);
  zoomLevel = signal<ZoomLevel>('day');
  headers: string[] = [];
  
  ngOnInit(): void {
    this.zoomLevel = this.timelineService.currentZoom;
    this.headers = this.timelineService.timelineLabels();
  }
}
