import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {
  @Input() users: Array<string>;
  @Input() current: string;
  @Output() newConv = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onUserClick(username: string): boolean {
    this.newConv.emit(username);
    return false;
  }

}
