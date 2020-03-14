import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOperateurComponent } from './single-operateur.component';

describe('SingleOperateurComponent', () => {
  let component: SingleOperateurComponent;
  let fixture: ComponentFixture<SingleOperateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOperateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
