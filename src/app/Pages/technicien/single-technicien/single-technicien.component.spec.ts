import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTechnicienComponent } from './single-technicien.component';

describe('SingleTechnicienComponent', () => {
  let component: SingleTechnicienComponent;
  let fixture: ComponentFixture<SingleTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
