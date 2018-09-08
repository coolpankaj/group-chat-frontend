import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetCodeToMailComponent } from './send-reset-code-to-mail.component';

describe('SendResetCodeToMailComponent', () => {
  let component: SendResetCodeToMailComponent;
  let fixture: ComponentFixture<SendResetCodeToMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendResetCodeToMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendResetCodeToMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
