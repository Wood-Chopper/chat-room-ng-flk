# Kinesis Data Stream

[PutRecordCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/kinesis/command/PutRecordCommand/)

## Creating the client

```typescript
let kinesisClient = new KinesisClient(
  {
    region: 'xxx',
    credentials: {
      accessKeyId: 'xxx',
      secretAccessKey: 'xxx',
    },
  },
);
```

## Sending a message

```typescript
let channel = 'chat';
let message = 'hello world';
const command = new PutRecordCommand(
  { // PutRecordInput
    Data: Buffer.from(
      `{
        "channel": "${channel}"
        "message": "${message}",
      }`,
    ),
    PartitionKey: channel, // required
    StreamARN: 'xxx',
  },
);
kinesisClient.send(command);
```

