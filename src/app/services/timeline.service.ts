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

  // Current center date (we'll make this movable later)
  private centerDate = new Date(); // today

  getPixelsPerDay(): number {
    return this.pixelsPerDay;
  }

  dateToPosition(date: Date): number {
    const diffMs = date.getTime() - this.centerDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays * this.pixelsPerDay;
  }

  // We'll need the reverse too later (click → date)
  positionToDate(pixelX: number): Date {
    const days = pixelX / this.pixelsPerDay;
    const result = new Date(this.centerDate);
    result.setDate(result.getDate() + Math.round(days));
    return result;
  }

  // Quick way to change zoom (very basic for now)
  setZoom(level: ZoomLevel) {
    this.zoomLevel.next(level);

    // Very naive zoom scaling – you'll refine this
    if (level === 'day') this.pixelsPerDay = 113;
    if (level === 'week') this.pixelsPerDay = 20;
    if (level === 'month') this.pixelsPerDay = 4;
  }

  /**
   * Returns array of formatted header labels depending on current zoom level
   * @param zoomLevel 'day' | 'week' | 'month'
   * @param centerDate optional - date to center the timeline around (defaults to today)
   * @returns string[] - formatted labels for timeline header
   */
  getTimelineHeaders(zoomLevel: 'day' | 'week' | 'month', centerDate: Date = new Date()): string[] {
    switch (zoomLevel) {
      case 'day':
        return this.generateDayLabels(centerDate, 60, -30); // ~3 months centered

      case 'week':
        return this.generateWeekLabels(centerDate, 52, -26); // ~1 year centered

      case 'month':
        return this.generateMonthLabels(centerDate, 18, -9); // ~1.5 years centered

      default:
        return this.generateMonthLabels(centerDate, 12, -6);
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // Day labels (Monday 12, Tuesday 13, ...)
  private generateDayLabels(refDate: Date, count: number, offsetDays: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      const d = new Date(refDate);
      d.setDate(d.getDate() + offsetDays + i);

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      result.push(`${dayName} ${d.getDate()}`);
    }

    return result;
  }

  // ─────────────────────────────────────────────────────────────────────
  // Week labels (Jan 5 – 11, Jan 29 – Feb 4, ...)
  private generateWeekLabels(refDate: Date, count: number, offsetWeeks: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      const weekStart = new Date(refDate);

      // Move to Monday of the week
      const day = weekStart.getDay();
      const diff = day === 0 ? -6 : 1 - day; // Sunday → -6, others → Monday
      weekStart.setDate(weekStart.getDate() + diff + (offsetWeeks + i) * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startMonth = weekStart.toLocaleDateString('en-US', { month: 'short' });
      const endMonth = weekEnd.toLocaleDateString('en-US', { month: 'short' });

      const startDay = weekStart.getDate();
      const endDay = weekEnd.getDate();

      if (startMonth === endMonth) {
        result.push(`${startMonth} ${startDay} – ${endDay}`);
      } else {
        result.push(`${startMonth} ${startDay} – ${endMonth} ${endDay}`);
      }
    }

    return result;
  }

  // ─────────────────────────────────────────────────────────────────────
  // Month labels (Sep 2025, Oct 2025, ...)
  private generateMonthLabels(refDate: Date, count: number, offsetMonths: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      const d = new Date(refDate.getFullYear(), refDate.getMonth() + offsetMonths + i, 1);

      result.push(
        d.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      );
    }

    return result;
  }

  /**
   * Optional utility method - useful when user clicks "Today" button
   */
  getToday(): Date {
    return new Date();
  }

  getArraySize(arr: string[]) {
    return Array(arr)
      .fill([])
      .map((_, i) => i);
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
