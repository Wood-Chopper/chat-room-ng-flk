import { Injectable } from '@angular/core';
import { Store } from './store';
import { Information } from '../domain/model/information.model';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  },
)
export class InformationState {

  private store: Store<{ informations: Information[] }> = new Store(
    {
      informations: [] as Information[],
    },
  );

  public readonly informations$: Observable<Information[]> =
    this.store.select(state => state.informations)

  addInformation(info: Information): void {
    this.store.update(state => ({
      informations: [...state.informations, info]
    }))
  }
}
