import { delay, map, Observable, of, Subject, tap } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

describe('RxJs exercises', () => {
  function assertObs$(obs$: Observable<any>, expected: any[]) {
    let index = 0;

    obs$.subscribe(
      {
        next: (v) => {
          expect(v).toEqual(expected[index++]);
        },
        error: () => expect(false).toBeTruthy(),
        complete: () => {
          expect(index).toEqual(expected.length);
        },
      },
    );
  }

  it('should create an Observable', waitForAsync(() => {
    // TODO modify the next line to create an Observable emitting 1, 2, 3
    const obs$: Observable<number> = null as unknown as Observable<number>;

    const expected = [1, 2, 3];
    assertObs$(obs$, expected);
  }));

  it('should populate and complete an Observable', waitForAsync(() => {
    const obs$: Subject<number> = new Subject();

    const expected = [1, 2, 3];
    assertObs$(obs$, expected);

    //TODO here

    obs$.complete();
  }));

  it('should map values', waitForAsync(() => {
    const obs$ = of(1, 2, 3);

    const result$ = of(0);//TODO transform obs$

    const expected = [2, 4, 6];
    assertObs$(result$, expected);
  }));

  it('should combine observables together', waitForAsync(() => {
    const obs1$ = of(1, 2, 3);
    const obs2$ = of('a', 'b', 'c');

    const result$ = of(0);//TODO transform obs$

    const expected = ['1a', '2b', '3c'];
    assertObs$(result$, expected);
  }));

  it('should limit the observable to 3 elements', waitForAsync(() => {
    const obs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    const result$ = of(0);//TODO transform obs$

    const expected = [1, 2, 3];
    assertObs$(result$, expected);
  }));

  it('should filter out odd values', waitForAsync(() => {
    const obs$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    const result$ = of(0);//TODO transform obs$

    const expected = [2, 4, 6, 8, 10];
    assertObs$(result$, expected);
  }));

  it('should map values to objects', waitForAsync(() => {
    const obs$ = of(1, 2, 3);

    const result$ = of(0);//TODO transform obs$

    const expected = [{value: 2}, {value: 4}, {value: 6}];
    assertObs$(result$, expected);
  }));

  it('should catch and treat errors', waitForAsync(() => {

    function doTheMath(v: number) {
      if (v === 0) {
        throw new Error();
      }
      return 10 / v;
    }

    const obs$ = of(5, 4, 3, 2, 1, 0);

    //TODO modify this line
    const result$ = obs$.pipe(map(v => doTheMath(v)));

    const expected = [10 / 5, 10 / 4, 10 / 3, 10 / 2, 10, Infinity];
    assertObs$(result$, expected);
  }));

  it('should get the first value', waitForAsync(() => {
    const obs$ = of(5, 4, 3, 2, 1, 0);

    const result$ = of(0);//TODO transform obs$

    const expected = [5];
    assertObs$(result$, expected);
  }));

  it('should map by returning an observable', waitForAsync(() => {

    function apiCall$(id: number): Observable<{ id: number, response: string }> {
      //Some API call returning an object
      return of({id, response: id.toString()}).pipe(delay(100));
    }

    const obs$ = of(5, 4, 3);
    //TODO subscription in subscription is a bad practice fix this code
    const result$ = new Subject();
    obs$.subscribe(id => {
      apiCall$(id).subscribe(apiResult => {
        result$.next(apiResult);
      });
    });

    const expected = [
      {id: 5, response: '5'},
      {id: 4, response: '4'},
      {id: 3, response: '3'},
    ];
    assertObs$(result$, expected);
    result$.complete();//TODO remove this
  }));

  it('should generate an observable with 1000 values emitted', waitForAsync(() => {
    const result$ = of(0);//TODO transform obs$

    const expected = [...Array(1000).keys()];
    assertObs$(result$, expected);
  }));

  it('should start with a given value (0)', waitForAsync(() => {
    const obs$ = of(1, 2, 3);

    const result$ = of(0);//TODO transform obs$

    const expected = [0, 1, 2, 3];
    assertObs$(result$, expected);
  }));

  it('should emit only when values change', waitForAsync(() => {
    const obs$ = of(1, 2, 2, 3, 4, 2, 2, 4, 5, 6, 6);

    const result$ = of(0);//TODO transform obs$

    const expected = [1, 2, 3, 4, 2, 4, 5, 6];
    assertObs$(result$, expected);
  }));

  it('should retry on API error', waitForAsync(() => {

    function unreliableApiCall$(id: number): Observable<{ id: number, response: string }> {
      //Some API call returning an object
      const response$ = of({id, response: id.toString()});
      if (Math.random() < 0.5) {
        // Simulate an issue
        return response$.pipe(tap(() => {throw new Error();}));
      }
      return response$;
    }

    const obs$ = of(6, 5, 4, 3, 2, 1, 0);
    //TODO subscription in subscription is a bad practice fix this code
    const result$ = new Subject();
    obs$.subscribe(id => {
      unreliableApiCall$(id).subscribe(apiResult => {
        result$.next(apiResult);
      });
    });

    const expected = [
      {id: 6, response: '6'},
      {id: 5, response: '5'},
      {id: 4, response: '4'},
      {id: 3, response: '3'},
      {id: 2, response: '2'},
      {id: 1, response: '1'},
      {id: 0, response: '0'},
    ];
    assertObs$(result$, expected);
    result$.complete();//TODO remove this
  }));

});
