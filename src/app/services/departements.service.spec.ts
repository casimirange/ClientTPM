import { TestBed } from '@angular/core/testing';

import { DepartementsService } from './departements.service';

describe('DepartementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartementsService = TestBed.get(DepartementsService);
    expect(service).toBeTruthy();
  });
});
