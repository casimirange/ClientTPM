import { TestBed } from '@angular/core/testing';

import { PannesService } from './pannes.service';

describe('PannesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PannesService = TestBed.get(PannesService);
    expect(service).toBeTruthy();
  });
});
