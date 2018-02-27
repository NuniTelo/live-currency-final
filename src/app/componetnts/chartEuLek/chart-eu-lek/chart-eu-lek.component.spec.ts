import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartEuLekComponent } from './chart-eu-lek.component';

describe('ChartEuLekComponent', () => {
  let component: ChartEuLekComponent;
  let fixture: ComponentFixture<ChartEuLekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartEuLekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartEuLekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
