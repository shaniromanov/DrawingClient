import { TestBed } from '@angular/core/testing';

import { GetShareUserService } from './get-share-user.service';

describe('GetShareUserService', () => {
  let service: GetShareUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShareUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
