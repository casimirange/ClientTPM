import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddingLayoutComponent } from './padding-layout.component';

describe('PaddingLayoutComponent', () => {
  let component: PaddingLayoutComponent;
  let fixture: ComponentFixture<PaddingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaddingLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
