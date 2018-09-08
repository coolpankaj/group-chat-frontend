import { ChatRoomManagementModule } from './chat-room-management.module';

describe('ChatRoomManagementModule', () => {
  let chatRoomManagementModule: ChatRoomManagementModule;

  beforeEach(() => {
    chatRoomManagementModule = new ChatRoomManagementModule();
  });

  it('should create an instance', () => {
    expect(chatRoomManagementModule).toBeTruthy();
  });
});
