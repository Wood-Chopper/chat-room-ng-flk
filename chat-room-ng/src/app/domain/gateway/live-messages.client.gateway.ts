import { Observable } from 'rxjs';
import { Message } from '../model/message.model';

export abstract class LiveMessagesClientGateway {
  abstract listenToMessages(): Observable<Message>;
}
