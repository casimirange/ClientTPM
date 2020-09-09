import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanneComponent } from './edit-panne.component';

describe('EditPanneComponent', () => {
  let component: EditPanneComponent;
  let fixture: ComponentFixture<EditPanneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPanneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
