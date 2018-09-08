import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public password: any;

  constructor(public router: Router, public toastr: ToastrService, public groupChat: GroupchatService) { 
    console.log("login component called")
  }

  ngOnInit() {
  }

  /**
   * goToLogin 
   */
  public goToLogin = () => {
    this.router.navigate(['/'])
    
  }

  /**
   * goToSignup
   */
  public goToSignup = () => {
    this.router.navigate(['/signUp'])
    
  }

  /**
   * logIn
   */
  public logIn = () => {
    if (!this.email) {
      this.toastr.warning('Please enter email !')

    } else if (!this.password) {

      this.toastr.warning('please enter password !')

    } else {
      let data = {
        email: this.email,
        password: this.password
      }

      this.groupChat.signInFunction(data).subscribe((apiResponse) => {
        if (apiResponse.status == 200 ) {
          console.log(apiResponse)
        } else {
          this.toastr.error(apiResponse.error)
          
        }
      }, (err) => {
        this.toastr.error('Invalid Email / Password')
      });
    }
    
  }

} 