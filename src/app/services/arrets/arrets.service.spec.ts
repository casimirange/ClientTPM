import { TestBed } from '@angular/core/testing';

import { ArretsService } from './arrets.service';

describe('ArretsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArretsService = TestBed.get(ArretsService);
    expect(service).toBeTruthy();
  });
});
