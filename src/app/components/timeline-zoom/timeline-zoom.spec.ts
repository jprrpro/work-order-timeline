import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineZoom } from './timeline-zoom';

describe('TimelineZoom', () => {
  let component: TimelineZoom;
  let fixture: ComponentFixture<TimelineZoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineZoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineZoom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
