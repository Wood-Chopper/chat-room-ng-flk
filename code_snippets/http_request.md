# Http Requests

## Get request

```typescript
let result$: Observable<MessageDto[]> = this.httpClient.get<MessageDto[]>("http://localhost:3000/messages");
```

## Post request

```typescript
let result$ = this.httpClient.post("http://localhost:3000/messages", { some: 'body'})
```

## Get request with query parameters

```typescript
this.httpClient.get<any>('http://localhost:3000/messages', {
  params: {
    lang: 'en',
  },
});
```