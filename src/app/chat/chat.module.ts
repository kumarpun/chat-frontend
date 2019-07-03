import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../core/material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatAppComponent } from '../chat/chat-app/chat-app.component'; 
import { AuthenticationService } from '../services/authentication.service';
import { JwtInterceptor, ErrorInterceptor } from '../helpers';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    ChatAppComponent,
    ChatRoomComponent,
    MessageComponent
    ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class ChatModule { }
