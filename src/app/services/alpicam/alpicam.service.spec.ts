import { TestBed } from '@angular/core/testing';

import { AlpicamService } from './alpicam.service';

describe('AlpicamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlpicamService = TestBed.get(AlpicamService);
    expect(service).toBeTruthy();
  });
});
