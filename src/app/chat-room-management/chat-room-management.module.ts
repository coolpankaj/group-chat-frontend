import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultChatRoomComponent } from './default-chat-room/default-chat-room.component';
//import { CreateChatRoomComponent } from './create-chat-room/create-chat-room.component';
import { RouterModule, Router } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsocketService } from './../chatsocket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        
      
    ])

  ],
  declarations: [DefaultChatRoomComponent],
  providers: [ChatsocketService]
})
export class ChatRoomManagementModule { }
