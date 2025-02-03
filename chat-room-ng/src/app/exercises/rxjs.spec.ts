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
  })
});
