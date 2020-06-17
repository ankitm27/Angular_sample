import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngagementComponent } from './view-engagement.component';

describe('ViewEngagementComponent', () => {
  let component: ViewEngagementComponent;
  let fixture: ComponentFixture<ViewEngagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
