import { Component, OnInit,ViewContainerRef , ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatsocketService } from './../../chatsocket.service';
import * as $ from 'jquery';
import { Subscriber } from 'rxjs';
//import { join } from 'path';

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
    public messageList = [];
    public messageText: String;
    public scrollToChatTop:boolean= false;
    public loadingPreviousChat: boolean = false;
    public editRoom: any;
    


  constructor(public cookie: CookieService, public toastr: ToastrService, public groupchat: GroupchatService, public router: Router, public chatsocket: ChatsocketService) {
    console.log("default chat room called.")
   }

  ngOnInit() {
    this.authToken = this.cookie.get('authToken');
    this.userInfo = this.groupchat.getUserInfoFromLocalStorage();
    this.verifyUserConfirmation()
    //this.getOnlineUserList()
    this.allActiveGroups()
  }

  public verifyUserConfirmation : any = () => {
    console.log("verify user confirmation called")
    this.chatsocket.verifyUser().subscribe((data)=>{
     // console.log(data)
      this.disconnectedSocket = false;

      this.chatsocket.setUser(this.authToken);
      //this.getOnlineUserList();
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
      this.getOnlineUserList()      
     
   }

   public allActiveGroups : any = () => {
     console.log("fetching active rooms")
     this.chatsocket.getAllActiveGroups().subscribe((activeRoomList) => {
       this.activeRooms = activeRoomList;
      // console.log("active rooms list")      
       
     })
     console.log(this.activeRooms)
     console.log("==============================")
   }

  
   public pushToChatWindow  = (data) =>{
    this.messageText = "";
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }

   public sendMessage: any = () => {

    if(this.messageText){
  
      let message = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: this.cookie.get('receiverName'),
        receiverId: this.cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      } // end chatMsgObject
     // console.log(message);
      this.chatsocket.sendChatMessage(message)
      this.pushToChatWindow(message) 
  
    }
    else{
      this.toastr.warning('text message can not be empty')
  
    }
  
  } // end sendMessage
   public sendMessageUsingKeyPress = (event:any) =>{

    if(event.keyCode === 13)
    {
      this.sendMessage();
    }
  }


public editToRoom = () => {
  console.log("edit room called")
  let editedRoomData = {
                         currentRoomName: this.connectedRoom,
                         newRoomName: this.editRoom
                        }
  
  this.chatsocket.editRoomName(editedRoomData)
  this.allActiveGroups()
}

public changeRoom(joinRoomName) {
  console.log("switch to room called")
  console.log(joinRoomName)
  //this.chatsocket.exitSocket()
  this.connectedRoom = joinRoomName
  this.chatsocket.switchRoom(joinRoomName)
  
  this.allActiveGroups()
  this.getOnlineUserList()
  

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
        this.chatsocket.disconnectedSocket()
        this.router.navigate(['/'])
      } else {
        this.toastr.error(apiResponse.message)
      }
    }, (err) => {
      this.toastr.error("something went wrong !")
    }) 
  }

}
