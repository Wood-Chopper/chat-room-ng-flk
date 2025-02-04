import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageListComponent } from './view/message-list/message-list.component';
import { MessageInputComponent } from './view/message-input/message-input.component';

@Component({
  selector: 'app-root',
             imports: [RouterOutlet, MessageListComponent, MessageInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [

  ]
})
export class AppComponent {
  title = 'chat-room-ng';

  constructor() {
  }
}
