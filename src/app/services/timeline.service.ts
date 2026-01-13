import { computed, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

export type ZoomLevel = 'day' | 'week' | 'month';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  currentDate = signal(DateTime.now());
  currentZoom = signal<ZoomLevel>('day');
  viewSize = signal(30); // Show 7 items
  rowHeight = signal(48);
  columnWidth = signal(113);

  // The labels update automatically when any signal above changes
  timelineLabels = computed(() => {
    return this.generateTimelineLabels(
      this.currentDate().toJSDate(),
      this.currentZoom(),
      this.viewSize()
    );
  });

  // We'll improve this a lot later
  zoomLevel = new BehaviorSubject<ZoomLevel>('day');

  // How many pixels per day (will change with zoom)
  private pixelsPerDay = 80; // ← tune this!

  // Quick way to change zoom (very basic for now)
  setZoom(level: ZoomLevel) {
    this.zoomLevel.next(level);

    // Very naive zoom scaling – you'll refine this
    if (level === 'day') this.pixelsPerDay = 113;
    if (level === 'week') this.pixelsPerDay = 20;
    if (level === 'month') this.pixelsPerDay = 4;
  }

  /**
   * Generates a list of labels based on a starting date and zoom level.
   * @param initialDate The starting point (Date or ISO string)
   * @param zoomLevel 'day' | 'week' | 'months'
   * @param count How many periods to generate
   */
  generateTimelineLabels(
    initialDate: Date | string,
    zoomLevel: ZoomLevel,
    count: number
  ): string[] {
    const result: string[] = [];

    // 1. Initialize Luxon DateTime
    let start =
      initialDate instanceof Date
        ? DateTime.fromJSDate(initialDate)
        : DateTime.fromISO(initialDate);

    // 2. Map ZoomLevel to Luxon formatting and period logic
    for (let i = 0; i < count; i++) {
      let current: DateTime;
      let label: string;

      switch (zoomLevel) {
        case 'day':
          current = start.plus({ days: i });
          label = current.toFormat('ccc dd'); // "Mon 14"
          break;

        case 'week':
          // Get the start and end of the specific week
          const weekStart = start.plus({ weeks: i }).startOf('week');
          const weekEnd = weekStart.endOf('week');
          label = `${weekStart.toFormat('ccc dd')} - ${weekEnd.toFormat('ccc dd')}`; // "Mon 14 - Sun 20"
          break;

        case 'month':
          current = start.plus({ months: i });
          label = current.toFormat('LLLL yyyy'); // "September 2025"
          break;

        default:
          label = '';
      }

      result.push(label);
    }

    return result;
  }
}
