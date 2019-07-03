import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatAppComponent } from '../chat/chat-app/chat-app.component';
import { ChatRoomComponent } from '../chat/chat-room/chat-room.component';
import { MessageComponent } from '../chat/message/message.component';
const routes: Routes = [

    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
  {
    path: 'chat',
    component: ChatAppComponent
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'chat', children: [
      { path: ':chatWith', component: ChatRoomComponent },
      { path: '**', redirectTo: '/chat/chatroom', pathMatch: 'full' }
    ]
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ChatRoutingModule { }
