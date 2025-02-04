import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InformationFacade } from '../../domain/information.facade';

@Component({
  selector: 'app-view-one',
             imports: [
               FormsModule,
             ],
  templateUrl: './view-one.component.html',
  styleUrl: './view-one.component.scss'
})
export class ViewOneComponent {

  infofacade = inject(InformationFacade)

  inputInfo = '';

  public sendInfo() {
    this.infofacade.sendInformation(this.inputInfo);
  }
}
