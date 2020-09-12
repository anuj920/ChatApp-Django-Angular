import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../chatroom.service';
import { ChatsocketService } from '../../chatsocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  current_msg:string='';
  messages:Array<any>;
  current_username:string;
  scrollTimeInterval: number;
  userTo:number;

  constructor(private chatsocket: ChatsocketService, private chatservice: ChatroomService,private activateroute: ActivatedRoute) { 
    this.messages = new Array<any>();
  }

  ngOnInit(): void {
    this.chatsocket.messageList.subscribe(res=>{
      if(res){
        let msg = res;
        if(msg.userNameTo == localStorage.getItem("ChatAppUser") || msg.username == localStorage.getItem("ChatAppUser")){
          this.messages.push(msg)
        }
      }
    });

    this.chatservice.myMessage.subscribe(res=>{
      if(res){
        this.getMessage(res);
      }
    })

    let id = this.activateroute.snapshot.params["id"];
    if(id){
      this.getMessage(id);
    }
    this.scrollwindow();
  }

  getMessage(id){
    this.chatservice.getMessage(id).subscribe(res=>{
      if(res){
        this.userTo = id;
        this.messages = res;
        let userData = JSON.parse(localStorage.getItem("curr_user"));
        this.current_username = (userData[0].username);
      }
    })
  }


  SendMsg(){
    this.chatsocket.sendMsg(this.current_msg,this.userTo);
    this.current_msg = '';
  }

  scrollwindow(){
    this.scrollTimeInterval = window.setInterval(function() {
      var elem = document.getElementById('online-chat');
      elem.scrollTop = elem.scrollHeight;
    },5000);
  }

  ngOnDestroy(): void {

    clearInterval(this.scrollTimeInterval);
    
  }

}
