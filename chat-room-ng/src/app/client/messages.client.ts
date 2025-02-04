import { MessagesClientGateway } from '../domain/gateway/messages-client.gateway';
import { map, Observable } from 'rxjs';
import { Message } from '../domain/model/message.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { messageToDto, messageToModel } from './mapper/message.mapper';
import { MessageDto } from './dto/message.dto';

export class MessagesClient extends MessagesClientGateway {

  private httpClient = inject(HttpClient);

  public getMessages(): Observable<Message[]> {
    return this.httpClient.get<MessageDto[]>('http://localhost:3000/messages').pipe(
      map(dtos => dtos.map(messageToModel))
    );
  }

  public postMessage(message: Message): Observable<Message> {
    let messageDto: MessageDto = messageToDto(message);
    return this.httpClient.post<MessageDto>('http://localhost:3000/messages', messageDto).pipe(
      map(messageToModel)
    );
  }
}

export const MESSAGE_CLIENT_PROVIDER = {
  provide: MessagesClientGateway,
  useClass: MessagesClient
}
