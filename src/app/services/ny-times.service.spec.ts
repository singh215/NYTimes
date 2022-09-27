import { TestBed } from '@angular/core/testing';

import { NyTimesService } from './ny-times.service';

describe('NyTimesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NyTimesService = TestBed.get(NyTimesService);
    expect(service).toBeTruthy();
  });
});
