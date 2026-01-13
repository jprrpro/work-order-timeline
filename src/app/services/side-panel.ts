import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidePanelService {
  isOpen = signal(false);
  activeData = signal<any | null>(null);

  open(data: any = null) {
    this.activeData.set(data);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
