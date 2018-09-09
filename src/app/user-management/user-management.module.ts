import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
//import { SendResetCodeToMailComponent } from './send-reset-code-to-mail/send-reset-code-to-mail.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoomManagementModule } from './../chat-room-management/chat-room-management.module';
import { DefaultChatRoomComponent } from './../chat-room-management/default-chat-room/default-chat-room.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatRoomManagementModule,
    RouterModule.forChild([
      { path: 'signUp', component: SignupComponent, pathMatch: 'full' },
      { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'},
      { path: 'defaultChatRoom', component: DefaultChatRoomComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, SignupComponent]
})
export class UserManagementModule { }
