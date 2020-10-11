import { TestBed } from '@angular/core/testing';

import { UnsubscribeUserService } from './unsubscribe-user.service';

describe('UnsubscribeUserService', () => {
  let service: UnsubscribeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsubscribeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
