import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatroomService } from '../../chatroom.service';
import { ChatsocketService } from '../../chatsocket.service';

@Component({
  selector: 'app-onlinelist',
  templateUrl: './onlinelist.component.html',
  styleUrls: ['./onlinelist.component.scss']
})
export class OnlinelistComponent implements OnInit {

  Data:any;

  OnlineUserList:Array<any>;

  constructor(private socketService: ChatsocketService,private route: Router,private chatservice: ChatroomService) {
    this.OnlineUserList = new Array<any>();
   }

  ngOnInit(): void {
    this.socketService.connect();
    this.socketService.onlineUser.subscribe(res=>{
      if(res){
        this.Data = (res['online_users']);
        this.OnlineUserList = new Array<any>();
        this.convert()
      }
    })
  }

  convert(){
    this.Data.forEach(i=>{
      let data = JSON.parse(i)
      if(data.username!=localStorage.getItem("ChatAppUser")){
        this.OnlineUserList.push(JSON.parse(i))
      }
    })
  }

  goToChat(value){
    let cc = this.OnlineUserList.filter(i=> i.id == value.id)
    localStorage.removeItem("curr_user");
    localStorage.setItem("curr_user",JSON.stringify(cc));
    let curr_url = this.route.url;
    if(curr_url=== '/chatroom'){
      this.route.navigate(['/chatroom/chat',value.id])
    }
    else{
      this.chatservice.myMessage.next(value.id)
      this.route.navigate(['/chatroom/chat',value.id])
    }
  }

}
