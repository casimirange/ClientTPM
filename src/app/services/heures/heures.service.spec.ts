import { TestBed } from '@angular/core/testing';

import { HeuresService } from './heures.service';

describe('HeuresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeuresService = TestBed.get(HeuresService);
    expect(service).toBeTruthy();
  });
});
