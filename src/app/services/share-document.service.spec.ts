import { TestBed } from '@angular/core/testing';

import { ShareDocumentService } from './share-document.service';

describe('ShareDocumentService', () => {
  let service: ShareDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
