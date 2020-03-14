import { TestBed } from '@angular/core/testing';

import { TechniciensService } from './techniciens.service';

describe('TechniciensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechniciensService = TestBed.get(TechniciensService);
    expect(service).toBeTruthy();
  });
});
