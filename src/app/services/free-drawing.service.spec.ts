import { TestBed } from '@angular/core/testing';

import { FreeDrawingService } from './free-drawing.service';

describe('FreeDrawingService', () => {
  let service: FreeDrawingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeDrawingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
