import { JoinChatRoomModule } from './join-chat-room.module';

describe('JoinChatRoomModule', () => {
  let joinChatRoomModule: JoinChatRoomModule;

  beforeEach(() => {
    joinChatRoomModule = new JoinChatRoomModule();
  });

  it('should create an instance', () => {
    expect(joinChatRoomModule).toBeTruthy();
  });
});
