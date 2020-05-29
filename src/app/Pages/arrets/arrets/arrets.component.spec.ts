import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretsComponent } from './arrets.component';

describe('ArretsComponent', () => {
  let component: ArretsComponent;
  let fixture: ComponentFixture<ArretsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArretsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
