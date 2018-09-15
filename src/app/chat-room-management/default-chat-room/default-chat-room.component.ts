import { Component, OnInit,ViewContainerRef , ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatsocketService } from './../../chatsocket.service';

@Component({
  selector: 'app-default-chat-room',
  templateUrl: './default-chat-room.component.html',
  styleUrls: ['./default-chat-room.component.css']
})
export class DefaultChatRoomComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef })
  @ViewChild('scrollMee', { read: ElementRef })

    public authToken: any;
    public userInfo: any;
    public disconnectedSocket: boolean;
    public userList:any = [];
    


  constructor(public cookie: CookieService, public toastr: ToastrService, public groupchat: GroupchatService, public router: Router, public chatsocket: ChatsocketService) {
    console.log("default chat room called.")
   }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    this.userInfo= this.groupchat.getUserInfoFromLocalStorage();
    this.verifyUserConfirmation()
    this.getOnlineUserList()
  }

  public verifyUserConfirmation : any = () =>{
    console.log("verifyuserconfirmationcalled")
    this.chatsocket.verifyUser().subscribe((data)=>{
     // console.log(data)
      this.disconnectedSocket = false;

      this.chatsocket.setUser(this.authToken);
      this.getOnlineUserList();
    });
   }

   public getOnlineUserList : any = () =>{
    console.log("online userlist called")
    this.chatsocket.onlineUserList().subscribe((userList)=>{
     // console.log(userList)
    this.userList = [];
    for(let x in userList)
    {
      let temp = {'userId': userList[x].userId, 'name': userList[x].fullName, 'unread':0,'chatting':false};
      this.userList.push(temp);
    }
    console.log(this.userList)
  });
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
        this.chatsocket.exitSocket()
        this.router.navigate(['/'])
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error("something went wrong !")
    }) 
  }

}
