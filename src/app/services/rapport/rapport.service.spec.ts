import { TestBed } from '@angular/core/testing';

import { RapportService } from './rapport.service';

describe('RapportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RapportService = TestBed.get(RapportService);
    expect(service).toBeTruthy();
  });
});
