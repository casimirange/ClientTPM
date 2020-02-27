import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDepartementComponent } from './single-departement.component';

describe('SingleDepartementComponent', () => {
  let component: SingleDepartementComponent;
  let fixture: ComponentFixture<SingleDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
