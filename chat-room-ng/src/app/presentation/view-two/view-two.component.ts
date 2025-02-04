import { Component, inject } from '@angular/core';
import { InformationFacade } from '../../domain/information.facade';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-two',
             imports: [
               AsyncPipe,
               JsonPipe,
             ],
  templateUrl: './view-two.component.html',
  styleUrl: './view-two.component.scss'
})
export class ViewTwoComponent {
  private facade = inject(InformationFacade);

  public informations$$ = toSignal(this.facade.information$);
}
