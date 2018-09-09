import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultChatRoomComponent } from './default-chat-room/default-chat-room.component';
//import { CreateChatRoomComponent } from './create-chat-room/create-chat-room.component';
import { RouterModule, Router } from '@angular/router'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
        
      
    ])

  ],
  declarations: [DefaultChatRoomComponent]
})
export class ChatRoomManagementModule { }
