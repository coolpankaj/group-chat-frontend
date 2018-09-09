import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultChatRoomComponent } from './default-chat-room.component';

describe('DefaultChatRoomComponent', () => {
  let component: DefaultChatRoomComponent;
  let fixture: ComponentFixture<DefaultChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
