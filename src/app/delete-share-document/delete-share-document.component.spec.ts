import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShareDocumentComponent } from './delete-share-document.component';

describe('DeleteShareDocumentComponent', () => {
  let component: DeleteShareDocumentComponent;
  let fixture: ComponentFixture<DeleteShareDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShareDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShareDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
