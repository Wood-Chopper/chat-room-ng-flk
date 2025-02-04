import { inject, Injectable } from '@angular/core';
import { InformationClientGateway } from './gateway/information.client.gateway';
import { InformationState } from '../state/information.state';

@Injectable({
              providedIn: 'root',
            })
export class InformationFacade {

  private informationClient = inject(InformationClientGateway);
  private inforState = inject(InformationState);

  public readonly information$ = this.inforState.informations$;

  public sendInformation(information: string): void {
    this.informationClient.sendInformation(
      {
        message: information,
        date: new Date(),
      },
    ).subscribe(newInformation => this.inforState.addInformation(newInformation));
  }
}

