import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './model/message.model';
import { ChatRoomStore } from '../state/chat-room.store';
import { MessagesClientGateway } from './gateway/messages-client.gateway';

@Injectable(
  {
    providedIn: 'root',
  },
)
export class ChatRoomFacade {

  chatRoomStore = inject(ChatRoomStore);
  messageClient = inject(MessagesClientGateway);

  messages$: Observable<Message[]> = this.chatRoomStore.messages$;

  loadMessages(): void {
    this.messageClient.getMessages()
      .subscribe(msgs => this.chatRoomStore.setMessages(msgs));
  }

  publishMessage(message: string): void {
    this.messageClient.postMessage({
                                     content: message,
                                     date: new Date(),
                                     author: 'me',
                                   })
      .subscribe(msg => this.chatRoomStore.addMessage(msg));
  }
}
