import { Message } from '../domain/model/message.model';

export type ChatRoomState = {
  messages: Message[]
}

export const initialChatRoomState: ChatRoomState = {
  messages: []
}
