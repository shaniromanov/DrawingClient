import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeUserComponent } from './unsubscribe-user.component';

describe('UnsubscribeUserComponent', () => {
  let component: UnsubscribeUserComponent;
  let fixture: ComponentFixture<UnsubscribeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubscribeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
