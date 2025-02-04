import { Component, inject } from '@angular/core';
import { ChatRoomFacade } from '../../domain/chat-room.facade';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message-list',
             imports: [
               NgClass,
             ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  chatRoomFacade = inject(ChatRoomFacade);

  messages$$ = toSignal(this.chatRoomFacade.messages$)

  constructor() {
    this.chatRoomFacade.loadMessages();
  }
}
