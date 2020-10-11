import { TestBed } from '@angular/core/testing';

import { UpdateMarkerColorServiceService } from './update-marker-color-service.service';

describe('UpdateMarkerColorServiceService', () => {
  let service: UpdateMarkerColorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateMarkerColorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
