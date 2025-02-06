import { MessagesClientGateway } from '../domain/gateway/messages-client.gateway';
import { combineLatest, from, map, Observable, switchMap } from 'rxjs';
import { Message } from '../domain/model/message.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { messageToDto, messageToModel } from './mapper/message.mapper';
import { MessageDto } from './dto/message.dto';
import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis';

export class MessagesClient extends MessagesClientGateway {

  private httpClient = inject(HttpClient);
  private textEncoder = new TextEncoder();

  private kinesisClient = new KinesisClient(
    {
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'xxx',
        secretAccessKey: 'xxx',
      },
    },
  );

  public getMessages(): Observable<Message[]> {
    return this.httpClient.get<MessageDto[]>('http://localhost:3000/messages').pipe(
      map(dtos => dtos.map(messageToModel))
    );
  }

  public postMessage(message: Message): Observable<Message> {

    let messageDto: MessageDto = messageToDto(message);

    let messageDtoObservable$: Observable<MessageDto> = this.httpClient.post<MessageDto>('http://localhost:3000/messages', messageDto);

    return messageDtoObservable$.pipe(
      switchMap(dtoWithId => this.sentToKinesis(dtoWithId)),
      map(messageToModel)
    );
  }

  private sentToKinesis(messageDto: MessageDto): Observable<MessageDto> {
    let messageString: string = JSON.stringify(messageDto);
    const command = new PutRecordCommand(
      {
        Data: this.textEncoder.encode(messageString),
        PartitionKey: messageDto.id,
        StreamARN: 'arn:aws:kinesis:us-east-1:635186394528:stream/jena-training',
      },
    );

    let input: Promise<unknown> = this.kinesisClient.send(command);
    return from(input).pipe(
      map(() => messageDto)
    );
  }
}

export const MESSAGE_CLIENT_PROVIDER = {
  provide: MessagesClientGateway,
  useClass: MessagesClient
}
