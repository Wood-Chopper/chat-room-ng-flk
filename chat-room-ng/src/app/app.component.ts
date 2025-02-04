import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewOneComponent } from './presentation/view-one/view-one.component';
import { ViewTwoComponent } from './presentation/view-two/view-two.component';

@Component({
  selector: 'app-root',
             imports: [RouterOutlet, ViewOneComponent, ViewTwoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [

  ]
})
export class AppComponent {
  title = 'chat-room-ng';

  constructor() {
  }
}
