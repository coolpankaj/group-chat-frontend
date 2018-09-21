import { Component, OnInit,ViewContainerRef , ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GroupchatService } from './../../groupchat.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatsocketService } from './../../chatsocket.service';
import * as $ from 'jquery';
//import { Subscriber } from 'rxjs';
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
    public myName: String;
    public typingPersonName: String;
    public status: any;
    public pageValue: number = 0;
    public invitationReceiverMail: String;
    


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
  this.newUserJoining()
  this.userLeftTheRoom()
  }


  public getMessageFromUser = () => {

    this.chatsocket.chatByUserId().subscribe((data) => {
        this.messageList.push(data)
        this.toastr.success(`${data.senderName} says ${data.message}`)
        this.scrollToChatTop = false
        console.log(data)
    })
  
  }


// create group and connected to room

   public connectToRoom : any = () => {
      console.log(this.roomName)
     this.chatsocket.createRoom(this.roomName)
     this.connectedRoom = this.roomName
     
      this.allActiveGroups()
      this.getOnlineUserList() 
      this.getMessageFromUser()  
      this.isTyping() 
      //this.roomNameChanged()  
      this.confirmDeletionRoom()
     
   }

   public allActiveGroups : any = () => {
     console.log("fetching active rooms")
     this.messageList = []
     this.chatsocket.getAllActiveGroups().subscribe((activeRoomList) => {
       console.log(activeRoomList)
       this.activeRooms = activeRoomList
             
       
     })
     
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

  public roomNameChanged = () => {
    console.log("room name changed called")
    this.chatsocket.roomNameEdited().subscribe((editedRoomData) => {

      console.log(editedRoomData)

      this.connectedRoom = editedRoomData.newRoomName
      this.allActiveGroups()
      this.getOnlineUserList()
     // this.changeRoom(editedRoomData.newRoomName)
  
    })
  }


public editToRoom = () => {
  console.log("edit room called")
  let editedRoomData = {
                         currentRoomName: this.connectedRoom,
                         newRoomName: this.editRoom
                        }
                        
  
  this.chatsocket.editRoomName(editedRoomData)
  this.roomNameChanged()
  
  
}





public changeRoom(joinRoomName) {
  console.log("switch to room called")
  console.log(joinRoomName)
  //this.chatsocket.exitSocket()
  this.connectedRoom = joinRoomName
  this.chatsocket.switchRoom(joinRoomName)
  
  this.allActiveGroups()
  this.getOnlineUserList()  
  this.getMessageFromUser()
  this.isTyping()
  //this.newUserJoining()
  //this.roomNameChanged()
  this.confirmDeletionRoom()

}

public newUserJoining = () => {
  this.chatsocket.iJoinTheRoom().subscribe((fullName) => {
    console.log(fullName + " join the room")
    this.toastr.info(`${fullName} join the room`)
  })
}

public userLeftTheRoom = () => {
  this.chatsocket.iLeftTheRoom().subscribe((fullName) => {
    console.log(fullName + " left the room")
    this.toastr.info(`${fullName} left the room`)
  })
}



public iAmTyping = () => {

  console.log("i am typing called")
  
  this.myName = this.userInfo.firstName,
  this.status = 1

  let data = {
    myName : this.myName,
    status: this.status

  }
  this.chatsocket.personTyping(data)
  
}

public  iAmNotTyping = () => {

  console.log("i am not typing called")
  this.myName = this.userInfo.firstName,
  this.status = 0

  let data = {
    myName : this.myName,
    status: this.status

  }
  setTimeout(() => {
    this.chatsocket.personTyping(data)
  }, 1200);
  this.isTyping()

}

public isTyping = () => {
  this.chatsocket.checkIfTyping().subscribe((data) => {
    console.log(data)

    if (data.status == 1) {
      this.typingPersonName = data.myName
    
    } else {
      delete this.typingPersonName
    }
    console.log(this.typingPersonName)
  })
}



public deleteThisRoom = () => {

  this.toastr.success(`${this.connectedRoom} is deleted`)
  
  this.chatsocket.deleteRoom(this.connectedRoom)
  
  delete this.connectedRoom
 
  this.allActiveGroups()
  this.getOnlineUserList()
  //this.userList = []
  delete this.connectedRoom
  this.confirmDeletionRoom
  
}

public confirmDeletionRoom = () => {
    this.chatsocket.confirmDeletion().subscribe(() => {
      delete this.connectedRoom
    })
}


public loadEarlierPageOfChat:any=()=>{
  this.loadingPreviousChat=true;
  this.pageValue++;
  this.scrollToChatTop=true;
  this.getPreviousChatOfRoom();
}

public getPreviousChatOfRoom=()=>{
  let previousData = (this.messageList.length > 0 ? this.messageList.slice():[])
  this.chatsocket.getChat(this.connectedRoom,this.pageValue*10).subscribe((apiResponse)=>{
        //console.log(apiResponse);
        if(apiResponse.status == 200){
          this.messageList=apiResponse.data.concat(previousData);
        }
        else{
          this.messageList=previousData;
          this.toastr.warning("No messages available");
        }
        this.loadingPreviousChat=false;
  },
  (err)=>{
    this.toastr.error("some error occurred");
  });
}



public invitation = () => {

  if (this.invitationReceiverMail == "" || this.invitationReceiverMail == undefined) {
    this.toastr.warning("Enter email")
    return false
  } else {
    let tempData = {
      mailReceiver: this.invitationReceiverMail
    }
    this.chatsocket.generateMail(tempData)
    this.toastr.success("Invitation sent !")
  }
  
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
