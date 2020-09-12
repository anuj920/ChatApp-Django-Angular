import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  myMessage = new BehaviorSubject(null);
  messageUpdate = this.myMessage.asObservable();

  constructor(private http:HttpClient) { }


  getMessage(id):Observable<any>{
    return this.http.get(`${environment.servicesUrl}/chat/messagelist/?id=${id}`);
  }
}
