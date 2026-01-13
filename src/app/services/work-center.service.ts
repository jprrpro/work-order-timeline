import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { WorkOrder } from '../models/work-order.model';
import { WorkCenter } from '../models/work-center.model';
import { TimelineBaseDocument } from '../models/timeline';
import { catchError, Observable, of, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkCenterService {
  private http = inject(HttpClient);
  private readonly JSON_PATHS = {
    workCenters: 'wc-mock.json',
    workOrders: 'wo-mock.json',
  };
  workCenters = signal<(WorkCenter | TimelineBaseDocument)[]>([]);
  workOrders = signal<(WorkOrder | TimelineBaseDocument)[]>([]);

  getAllWorkCenters(): Observable<(WorkCenter | TimelineBaseDocument)[]> {
    return this.http
      .get<(WorkCenter | TimelineBaseDocument)[]>(this.JSON_PATHS.workCenters)
      .pipe(catchError(() => of([])));
  }

  getAllWorkOrders(): Observable<(WorkOrder | TimelineBaseDocument)[]> {
    return this.http
      .get<(WorkOrder | TimelineBaseDocument)[]>(this.JSON_PATHS.workOrders)
      .pipe(catchError(() => of([])));
  }

  getOrdersByWorkCenter(wcId: string): Observable<(WorkOrder | TimelineBaseDocument)[]> {
    return this.http.get<(WorkOrder | TimelineBaseDocument)[]>(this.JSON_PATHS.workOrders).pipe(
      map((orders) => orders.filter((order) => order.data.workCenterId === wcId)),
      catchError(() => of([]))
    );
  }

  // getOrdersByWorkCenter(wcId: string): Signal<(WorkOrder | TimelineBaseDocument)[]> {
  //   return computed(() => this.workOrdersRawData().filter(order => order.docId === wcId));
  // }

  // test() {
  //   return this.workCentersFromJSON$;
  // }
}
