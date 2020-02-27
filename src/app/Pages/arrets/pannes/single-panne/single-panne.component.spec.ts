import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePanneComponent } from './single-panne.component';

describe('SinglePanneComponent', () => {
  let component: SinglePanneComponent;
  let fixture: ComponentFixture<SinglePanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
