import { TestBed } from '@angular/core/testing';

import { OperateursService } from './operateurs.service';

describe('OperateursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperateursService = TestBed.get(OperateursService);
    expect(service).toBeTruthy();
  });
});
