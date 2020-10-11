import { TestBed } from '@angular/core/testing';

import { RemoveShareDocumentService } from './remove-share-document.service';

describe('RemoveShareDocumentService', () => {
  let service: RemoveShareDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveShareDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
