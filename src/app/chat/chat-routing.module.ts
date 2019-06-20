import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatAppComponent } from '../chat/chat-app/chat-app.component';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full'
    },
  {
    path: 'chat',
    component: ChatAppComponent
  }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ChatRoutingModule { }
