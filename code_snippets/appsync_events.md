# AppSync Events

## Configure Amplify

```typescript
Amplify.configure(
  {
    API: {
      Events: {
        endpoint:
          'https://xxx.appsync-api.eu-central-1.amazonaws.com/event',
        region: 'eu-central-1',
        defaultAuthMode: 'apiKey',
        apiKey: 'da2-xxx',
      },
    },
  },
);
```

## Subscribe to a channel

```typescript
let subject$: Subject<any> = new Subject<any>();

from(events.connect('/namespace/channel', {
  authMode: 'apiKey',
  authToken: 'da2-xxx',
})).subscribe(eventChannel => {
  eventChannel.subscribe(
    {
      next(value: any) {
        subject$.next(value);
      },
      error(errorValue: any) {
        console.error(errorValue);
      },
    },
  );
});
```