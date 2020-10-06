import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCartComponent } from './dash-cart.component';

describe('DashCartComponent', () => {
  let component: DashCartComponent;
  let fixture: ComponentFixture<DashCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
