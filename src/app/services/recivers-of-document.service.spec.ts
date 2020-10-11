import { TestBed } from '@angular/core/testing';

import { ReciversOfDocumentService } from './recivers-of-document.service';

describe('ReciversOfDocumentService', () => {
  let service: ReciversOfDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReciversOfDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
