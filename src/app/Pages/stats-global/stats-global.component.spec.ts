import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGlobalComponent } from './stats-global.component';

describe('StatsGlobalComponent', () => {
  let component: StatsGlobalComponent;
  let fixture: ComponentFixture<StatsGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
