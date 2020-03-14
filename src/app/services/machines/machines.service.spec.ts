import { TestBed } from '@angular/core/testing';

import { MachinesService } from './machines.service';

describe('MachinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MachinesService = TestBed.get(MachinesService);
    expect(service).toBeTruthy();
  });
});
