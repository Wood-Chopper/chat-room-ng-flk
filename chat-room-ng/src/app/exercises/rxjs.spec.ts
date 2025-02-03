import { Observable, of, Subject } from 'rxjs';

describe('RxJs exercises', () => {
  function assert(obs$: Observable<any>, expected: any[], done: DoneFn) {
    let index = 0;

    obs$.subscribe(
      {
        next: (v) => expect(v).toEqual(expected[index++]),
        error: e => fail(e),
        complete: () => done(),
      },
    );
  }

  it('should create an Observable', (done) => {
    // TODO modify the next line to create an Observable emitting 1, 2, 3
    const obs$: Observable<number> = null as unknown as Observable<number>;

    const expected = [1, 2, 3];
    assert(obs$, expected, done);
  });

  it('should populate and complete an Observable', (done) => {
    const obs$: Subject<number> = new Subject();

    const expected = [1, 2, 3];
    assert(obs$, expected, done);

    //TODO here
  });

  it('should map values', (done) => {
    const obs$ = of(1, 2, 3);

    const result$ = obs$;//TODO line

    const expected = [2, 4, 6];
    assert(result$, expected, done);
  });

  it('should combine observables together', (done) => {
    const obs1$ = of(1, 2, 3);
    const obs2$ = of('a', 'b', 'c');

    const result$ = obs1$;//TODO line

    const expected = ['1a', '2b', '3c'];
    assert(result$, expected, done);
  });

  it('should merge observables together', (done) => {
    const obs1$ = of(1, 2, 3);
    const obs2$ = of('a', 'b', 'c');

    const result$ = obs1$;//TODO line

    const expected = [1, 'a', 2, 'b', 3, 'c'];
    assert(result$, expected, done);
  });

  it('should limit the observable to 3 elements', (done) => {
    const obs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    const result$ = obs$;//TODO line

    const expected = [1, 2, 3];
    assert(result$, expected, done);
  });

  it('should filter out odd values', (done) => {
    const obs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    const result$ = obs$;//TODO line

    const expected = [2, 4, 6, 8, 10];
    assert(result$, expected, done);
  });

  it('should map values to objects', (done) => {
    const obs$ = of(1, 2, 3);

    const result$ = obs$;//TODO line

    const expected = [{value: 2}, {value: 4}, {value: 6}];
    assert(result$, expected, done);
  });

  it('should catch and treat errors', (done) => {
    const obs$ = of(5, 4, 3, 2, 1, 0);

    const result$ = obs$;//TODO line

    const expected = [10/5, 10/4, 10/3, 10/2, 10, Infinity];
    assert(result$, expected, done);
  });

  it('should get the first value', (done) => {
    const obs$ = of(5, 4, 3, 2, 1, 0);

    const result$ = obs$;//TODO line

    const expected = [5];
    assert(result$, expected, done);
  });

  it('should map by returning an observable', (done) => {

    function apiCall$(id: number): Observable<{id: number, value: string}> {
      //Some API call returning an object
      return of({id, value: id.toString()})
    }

    const obs$ = of(5, 4, 3);
    //TODO subscription in subscription is a bad practice fix this code
    const result$ = new Subject();
    obs$.subscribe(id => {
      apiCall$(id).subscribe(apiResult => {
        result$.next(apiResult);
      })
    })

    const expected = [
      {id: 5, value: '5'},
      {id: 4, value: '4'},
      {id: 3, value: '3'},
    ];
    assert(result$, expected, done);
  });


  it('should generate an observable with 1000 values emitted', (done) => {
    const result$ = of(0);//TODO line

    const expected = [...Array(1000).keys()];
    assert(result$, expected, done);
  });

  it('should start with a given value (0)', (done) => {
    const obs$ = of(1, 2, 3);

    const result$ = obs$;//TODO line

    const expected = [0, 1, 2, 3];
    assert(result$, expected, done);
  });

  it('should emit only when values change', (done) => {
    const obs$ = of(1, 2, 2, 3, 4, 2, 2, 4, 5, 6, 6);

    const result$ = obs$;//TODO line

    const expected = [1, 2, 3, 4, 2, 4, 5, 6];
    assert(result$, expected, done);
  });

});
