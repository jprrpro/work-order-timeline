import { Injectable } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class NgbLuxonAdapter extends NgbDateAdapter<string> {
  // Converts a Luxon ISO string (from your API/Signal) into the Datepicker format
  fromModel(value: string | null): NgbDateStruct | null {
    if (!value) return null;

    const dt = DateTime.fromISO(value);
    if (!dt.isValid) return null;

    return {
      year: dt.year,
      month: dt.month,
      day: dt.day,
    };
  }

  // Converts the Datepicker selection back into a Luxon ISO string for your app
  toModel(date: NgbDateStruct | null): string | null {
    if (!date) return null;

    return DateTime.fromObject({
      year: date.year,
      month: date.month,
      day: date.day,
    }).toISO();
  }
}
