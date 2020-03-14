import { TestBed } from '@angular/core/testing';

import { LignesService } from './lignes.service';

describe('LignesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LignesService = TestBed.get(LignesService);
    expect(service).toBeTruthy();
  });
});
