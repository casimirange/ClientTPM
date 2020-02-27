import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPanneComponent } from './new-panne.component';

describe('NewPanneComponent', () => {
  let component: NewPanneComponent;
  let fixture: ComponentFixture<NewPanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
