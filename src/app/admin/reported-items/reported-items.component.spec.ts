import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedItemsComponent } from './reported-items.component';

describe('ReportedItemsComponent', () => {
  let component: ReportedItemsComponent;
  let fixture: ComponentFixture<ReportedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
