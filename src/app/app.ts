import { Component, inject, OnInit, signal } from '@angular/core';
import { WorkCenterList } from './components/work-center-list/work-center-list';
import { TimelineHeader } from './components/timeline-header/timeline-header';
import { TimelineRow } from './components/timeline-row/timeline-row';
import { WorkCenterService } from './services/work-center.service';
import { WorkCenter } from './models/work-center.model';
import { TimelineBaseDocument, ZoomLevel } from './models/timeline';
import { WorkOrder } from './models/work-order.model';
import { OrderStrip } from './components/order-strip/order-strip';
import { TimelineService } from './services/timeline.service';
import { TimelineZoom } from './components/timeline-zoom/timeline-zoom';
import { DateTime } from 'luxon';
import { WotForm } from './components/wot-form/wot-form';
import { LocalStorage } from './services/local-storage';

@Component({
  selector: 'app-root',
  imports: [
    WorkCenterList,
    TimelineHeader,
    TimelineRow,
    OrderStrip,
    TimelineZoom,
    WotForm
  ],
  
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('work-order-timeline');
  workCenterService = inject(WorkCenterService);
  timelineService = inject(TimelineService);
  localStorage = inject(LocalStorage);

  workCenters = signal<(WorkCenter | TimelineBaseDocument)[]>([]);
  workOrders = signal<(WorkOrder | TimelineBaseDocument)[]>([]);

  ngOnInit(): void {
    this.workCenters = this.workCenterService.workCenters;
    this.workOrders = this.workCenterService.workOrders;
    
    this.workCenterService
      .getAllWorkCenters()
      .subscribe((wc) => this.workCenterService.workCenters.set(wc));


    if (this.localStorage.exists('workOrders')) {
      const workOrders = this.localStorage.getItem('workOrders');
      this.workCenterService.workOrders.set(<WorkOrder[]>workOrders);
    } else {
      this.workCenterService
        .getAllWorkOrders()
        .subscribe((wo) => this.workCenterService.workOrders.set(wo)); 
    }
  }

  getTimePassed(order: TimelineBaseDocument | WorkOrder, zoomLevel: ZoomLevel) {
    const start = DateTime.fromISO(order.data.startDate);
    const end = DateTime.fromISO(order.data.endDate);
    const diff = end.diff(start, zoomLevel)[`${zoomLevel}s`];

    return Math.floor(diff);
  }

  getOrderOffsetFromInitialDate(order: TimelineBaseDocument | WorkOrder, zoomLevel: ZoomLevel) {
    const initialDate = DateTime.fromISO(DateTime.now().toISO());
    const startDate = DateTime.fromISO(order.data.startDate);
    const diff = startDate.diff(initialDate, zoomLevel)[`${zoomLevel}s`];

    return Math.floor(diff);
  }

  formatOrderDate(isoString: string): string {
    return DateTime.fromISO(isoString).toFormat('ccc dd');
    // Result: "Jan 12, 2026"
  }

  getOrderPosition(order: TimelineBaseDocument | WorkOrder): number {
    return 113 * this.getOrderOffsetFromInitialDate(order, 'day');
  }
  getOrderSize(order: TimelineBaseDocument | WorkOrder): number {
    return 113 * this.getTimePassed(order, 'day');
  }
}
