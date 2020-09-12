import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlinelistComponent } from './chatroom/onlinelist/onlinelist.component';
import { ChatComponent } from './chatroom/chat/chat.component';
import { RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom.component';

import { ChatroomService } from './chatroom.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatsocketService } from './chatsocket.service';
@NgModule({
  declarations: [
    ChatroomComponent,
    OnlinelistComponent,
    ChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
          path: '', component: ChatroomComponent,
          children: [
            { path: 'chat/:id', component: ChatComponent},
            { path: '**', redirectTo: 'dashboard'}
           ]

        }
    ]),
  ],
  providers: [
    ChatroomService,
    ChatsocketService,
  ]
})
export class ChatroomModule { }
