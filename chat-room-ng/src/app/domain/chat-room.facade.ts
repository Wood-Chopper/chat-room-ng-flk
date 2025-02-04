import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './model/message.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ChatRoomFacade {

  messages$: Observable<Message[]>;

  loadMessages(): void {

  }

  publishMessage(message: string): void {

  }
}
