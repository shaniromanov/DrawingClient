import { TestBed } from '@angular/core/testing';

import { HttpCommService } from './http-comm.service';

describe('HttpCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCommService = TestBed.get(HttpCommService);
    expect(service).toBeTruthy();
  });
});
