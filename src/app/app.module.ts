import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementModule } from './../app/user-management/user-management.module'
import { LoginComponent } from "./../app/user-management/login/login.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserManagementModule,
    RouterModule.forRoot([
        { path: 'login', component: LoginComponent },
        { path:'', redirectTo:'login', pathMatch:'full' },
        { path:'*', component:LoginComponent },
        { path:'**', component:LoginComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
