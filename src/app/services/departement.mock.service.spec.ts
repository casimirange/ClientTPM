import { TestBed } from '@angular/core/testing';

import { DepartementMockService } from './departement.mock.service';
import {Departement} from './departement.mock.service';

describe('Departement.Mock.Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartementMockService = TestBed.get(DepartementMockService);
    expect(service).toBeTruthy();
  });
});
