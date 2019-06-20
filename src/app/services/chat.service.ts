import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ChatService {

    public Url: string = environment.chatUrl;

    constructor(
        public http: HttpClient
    ) { }

    getChatsByRoom(roomId) {
        return this.http.get(`${this.Url}/${roomId}`);
    }

    saveChat(chat) {
        return this.http.post<any>(`${this.Url}`, chat);
    }
}



