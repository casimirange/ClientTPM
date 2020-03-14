import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLigneComponent } from './single-ligne.component';

describe('SingleLigneComponent', () => {
  let component: SingleLigneComponent;
  let fixture: ComponentFixture<SingleLigneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleLigneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
