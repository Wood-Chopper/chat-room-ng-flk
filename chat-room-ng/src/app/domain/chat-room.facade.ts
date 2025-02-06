import { inject, Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Message } from './model/message.model';
import { ChatRoomStore } from '../state/chat-room.store';
import { MessagesClientGateway } from './gateway/messages-client.gateway';
import { LiveMessagesClientGateway } from './gateway/live-messages.client.gateway';

@Injectable(
  {
    providedIn: 'root',
  },
)
export class ChatRoomFacade {

  chatRoomStore = inject(ChatRoomStore);
  messageClient = inject(MessagesClientGateway);
  liveMessagesClient = inject(LiveMessagesClientGateway);

  readonly messages$: Observable<Message[]> = this.chatRoomStore.messages$;

  constructor() {
    this.liveMessagesClient.listenToMessages().pipe(
      filter(msg => msg.author !== 'jena')
    ).subscribe(msg => this.chatRoomStore.addMessage(msg))
  }

  loadMessages(): void {
    this.messageClient.getMessages()
      .subscribe(msgs => this.chatRoomStore.setMessages(msgs));
  }

  publishMessage(message: string): void {
    this.messageClient.postMessage({
                                     content: message,
                                     date: new Date(),
                                     author: 'jena',
                                   })
      .subscribe(msg => this.chatRoomStore.addMessage(msg));
  }
}
