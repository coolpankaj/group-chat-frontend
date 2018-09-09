import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendResetCodeToMailComponent } from './send-reset-code-to-mail/send-reset-code-to-mail.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'signUp', component: SignupComponent, pathMatch: 'full' },
      { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, SendResetCodeToMailComponent, SignupComponent]
})
export class UserManagementModule { }
