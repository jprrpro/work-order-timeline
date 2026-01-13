import { TestBed } from '@angular/core/testing';

import { SidePanel } from './side-panel';

describe('SidePanel', () => {
  let service: SidePanel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidePanel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
