import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendResetCodeToMailComponent } from './send-reset-code-to-mail/send-reset-code-to-mail.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, SendResetCodeToMailComponent, SignupComponent]
})
export class UserManagementModule { }
