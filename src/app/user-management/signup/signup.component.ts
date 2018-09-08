import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( public router: Router) {
    console.log("signUp component called")
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
}
