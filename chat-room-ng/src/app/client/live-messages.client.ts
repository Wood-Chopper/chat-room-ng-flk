import { from, map, Observable, pluck, Subject, switchMap, tap } from 'rxjs';
import { LiveMessagesClientGateway } from '../domain/gateway/live-messages.client.gateway';
import { Message } from '../domain/model/message.model';
import { Amplify } from 'aws-amplify';
import { events } from 'aws-amplify/data';
import { MessagesClientGateway } from '../domain/gateway/messages-client.gateway';
import { MessagesClient } from './messages.client';

export class LiveMessagesClient extends LiveMessagesClientGateway {

  constructor() {
    super();
    Amplify.configure(
      {
        API: {
          Events: {
            endpoint:
              'https://q5ckogzm75cwzlkl45yp4koibm.appsync-api.us-east-1.amazonaws.com/event',
            region: 'eu-central-1',
            defaultAuthMode: 'apiKey',
            apiKey: 'xxx',
          },
        },
      },
    );
  }

  override listenToMessages(): Observable<Message> {

    return from(events.connect('/default/chatroom', {
      authMode: 'apiKey',
      authToken: 'xxx',
    })).pipe(
      switchMap(eventsChannel => {
        const events$ = new Subject<any>();
        eventsChannel.subscribe(
          {
            next(value: any) {events$.next(value);},
            error(errorValue: any) {console.log(errorValue);},
          },
        );
        return events$;
      }),
      map(something => something['event'])
    );
  }

}

export const LIVE_MESSAGES_CLIENT_PROVIDER = {
  provide: LiveMessagesClientGateway,
  useClass: LiveMessagesClient
}
