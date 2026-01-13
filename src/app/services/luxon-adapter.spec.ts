import { TestBed } from '@angular/core/testing';

import { LuxonAdapter } from './luxon-adapter';

describe('LuxonAdapter', () => {
  let service: LuxonAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LuxonAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
