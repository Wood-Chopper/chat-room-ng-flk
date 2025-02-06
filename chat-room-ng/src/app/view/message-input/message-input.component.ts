import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatRoomFacade } from '../../domain/chat-room.facade';

@Component({
  selector: 'app-message-input',
             imports: [
               ReactiveFormsModule,
             ],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {

  chatRoomFacade = inject(ChatRoomFacade);

  inputForm = new FormControl<string>('', [Validators.required])

  public send() {
    if (this.inputForm.valid) {
      let value: string = this.inputForm.value!;

      this.chatRoomFacade.publishMessage(value);

      this.inputForm.reset();
    }

  }
}
