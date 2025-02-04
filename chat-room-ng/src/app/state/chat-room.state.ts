import { Message } from '../domain/model/message.model';
import { ChatRoomStore } from './chat-room.store';

export type ChatRoomState = {
  authorName?: string,
  messages: Message[]
}

export const initialChatRoomState: ChatRoomState = {
  messages: []
}
