import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciversOfDocumentsComponent } from './recivers-of-documents.component';

describe('ReciversOfDocumentsComponent', () => {
  let component: ReciversOfDocumentsComponent;
  let fixture: ComponentFixture<ReciversOfDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciversOfDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciversOfDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
