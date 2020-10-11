import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetShareUserComponent } from './get-share-user.component';

describe('GetShareUserComponent', () => {
  let component: GetShareUserComponent;
  let fixture: ComponentFixture<GetShareUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetShareUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetShareUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
