import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementModule } from './../app/user-management/user-management.module'
import { LoginComponent } from "./../app/user-management/login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import {GroupchatService } from './../app/groupchat.service'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserManagementModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    RouterModule.forRoot([
        { path: 'login', component: LoginComponent, pathMatch: 'full' },
        { path:'', redirectTo:'login', pathMatch:'full' },
        { path:'*', component:LoginComponent },
        { path:'**', component:LoginComponent }
    ])
  ],
  providers: [GroupchatService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
