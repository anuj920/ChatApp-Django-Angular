import { Injectable } from '@angular/core';

import { environment }  from './../../../environments/environment'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

const socketURl = environment.wssServiceUrl

const socket = new WebSocket('ws://127.0.0.1:8000/ws/chat/all/');

@Injectable({
  providedIn: 'root'
})
export class ChatsocketService {


  private OnlineSource = new BehaviorSubject(null);
  onlineUser  = this.OnlineSource.asObservable();

  private messageSource = new BehaviorSubject(null);
  messageList = this.messageSource.asObservable();


  constructor() {

   }

  public connect(){
    socket.addEventListener('open',()=>{

      socket.send(JSON.stringify({"type":"online_users","token":localStorage.getItem("ChatAppToken")}));

    })

    socket.addEventListener('message',(event)=>{
        let res = JSON.parse(event.data);
        if(res["handle_type"]==="message"){
          this.messageSource.next(res);
        }
        else if(res["handle_type"]==="online_users"){
          this.OnlineSource.next(res);
        }
    })
  }

  public sendMsg(value,id){
    socket.send(JSON.stringify({"type":"message","token":localStorage.getItem("ChatAppToken"),"message":value,"userTo":id}));
  }

}
