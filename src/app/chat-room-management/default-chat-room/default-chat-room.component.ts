import { Component, OnInit,ViewContainerRef , ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatsocketService } from './../../chatsocket.service';

@Component({
  selector: 'app-default-chat-room',
  templateUrl: './default-chat-room.component.html',
  styleUrls: ['./default-chat-room.component.css'],
  providers: [ChatsocketService]
})
export class DefaultChatRoomComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef })
  @ViewChild('scrollMee', { read: ElementRef })

    public authToken: any;
    public userInfo: any;
    public disconnectedSocket: boolean;
    public userList:any = [];
    public activeRooms = [];
    public roomName: String;
    public connectedRoom: String;
    public groupOnlineUsersList = [];
    


  constructor(public cookie: CookieService, public toastr: ToastrService, public groupchat: GroupchatService, public router: Router, public chatsocket: ChatsocketService) {
    console.log("default chat room called.")
   }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    this.userInfo = this.groupchat.getUserInfoFromLocalStorage();
    this.verifyUserConfirmation()
   this.getOnlineUserList()
   this.allActiveGroups()
  }

  public verifyUserConfirmation : any = () =>{
    console.log("verify user confirmation called")
    this.chatsocket.verifyUser().subscribe((data)=>{
     // console.log(data)
      this.disconnectedSocket = false;

      this.chatsocket.setUser(this.authToken);
      this.getOnlineUserList();
      this.allActiveGroups()
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
    console.log("user-list")
    console.log(this.userList)
    console.log("=============================")
  });
  }



// create group and connected to room

   public connectToRoom : any = () => {
      console.log(this.roomName)
     this.chatsocket.createRoom(this.roomName)
     this.connectedRoom = this.roomName
     
      this.allActiveGroups()
      this.groupchatUsers()      
     
   }

   public allActiveGroups : any = () => {
     console.log("fetching active rooms")
     this.chatsocket.getAllActiveGroups().subscribe((activeRoomList) => {
       this.activeRooms = activeRoomList;
       console.log("active rooms list")
       console.log(this.activeRooms)
       console.log("==============================")
     })
   }

   public groupchatUsers : any = () => {
     console.log("fetching Group Chat Users.")
     this.chatsocket.groupOnlineUserList().subscribe((groupOnlineUsersList) => {
       this.groupOnlineUsersList = [];
       this.groupOnlineUsersList = groupOnlineUsersList
      
    console.log("group-chat-users")
    console.log(this.groupOnlineUsersList)
    console.log('========================')
     })
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