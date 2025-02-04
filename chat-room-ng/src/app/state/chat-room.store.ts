import { Injectable } from '@angular/core';
import { ChatRoomState, initialChatRoomState } from './chat-room.state';
import { Store } from './store';
import { Message } from '../domain/model/message.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ChatRoomStore {

  store = new Store<ChatRoomState>(initialChatRoomState);

  readonly messages$ = this.store.select(state => state.messages);

  setMessages(messages: Message[]) {
    this.store.update(state => ({
      ...state,
      messages: messages
    }))
  }

  addMessage(message: Message): void {
    this.store.update(state => ({
      ...state,
      messages: [...state.messages, message]
    }))
  }
}
