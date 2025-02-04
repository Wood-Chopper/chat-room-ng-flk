import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

export abstract class MessagesClientGateway {
  abstract getMessages(): Observable<Message[]>;

  abstract postMessage(message: Message): Observable<Message>
}
