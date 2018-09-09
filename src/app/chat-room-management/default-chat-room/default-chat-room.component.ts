import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-default-chat-room',
  templateUrl: './default-chat-room.component.html',
  styleUrls: ['./default-chat-room.component.css']
})
export class DefaultChatRoomComponent implements OnInit {

    public authToken: any;
    public userInfo: any;


  constructor(public cookie: CookieService, public toastr: ToastrService, public groupchat: GroupchatService, public router: Router) {
    console.log("default chat room called.")
   }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    this.userInfo= this.groupchat.getUserInfoFromLocalStorage();
  }

  public logOut = () => {
    let data = {
      userId: this.userInfo.userId,
      authToken: this.authToken
    }
    this.groupchat.logOut(data).subscribe((apiResponse) => {

      if (apiResponse.status === 200 ) {

        this.toastr.success("Logged Out successfully")
        
        this.cookie.delete('authToken')
        this.cookie.delete('receiverId')
        this.cookie.delete('receiverName')
        this.router.navigate(['/'])
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error("something went wrong !")
    }) 
  }

}
