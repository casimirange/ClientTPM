import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeuresMachinesComponent } from './heures-machines.component';

describe('HeuresMachinesComponent', () => {
  let component: HeuresMachinesComponent;
  let fixture: ComponentFixture<HeuresMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeuresMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeuresMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
