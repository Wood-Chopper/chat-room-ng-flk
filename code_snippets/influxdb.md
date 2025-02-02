# InfluxDB

[InfluxDB JS Client](https://github.com/influxdata/influxdb-client-js/blob/master/examples/query.ts)

## Query InfuxDB

```typescript
let queryApi = new InfluxDB({url: 'some url', token: 'some token'}).getQueryApi('org');
let fluxQuery =
  'from(bucket:"my-bucket") |> range(start: -1d) |> filter(fn: (r) => r._measurement == "message")';

let result$: Observable<string> = from(queryApi.queryRaw(fluxQuery));
```

_tips_: Transform the promise into an observable