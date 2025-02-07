import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
             imports: [
               JsonPipe,
               ReactiveFormsModule,
               FormsModule,
             ],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss'
})
export class TemplateDrivenFormComponent {
  formInformation = {
    username: '',
    pwd1: '',
    pwd2: '',
    email: ''
  }

  public register() {

    if(this.formInformation.username.trim() === '') {
      return;
    }
    if (this.formInformation.pwd1 !== this.formInformation.pwd2) {
      return;
    }

    alert(JSON.stringify(this.formInformation))
  }

  public isValid() {


    if(this.formInformation.username.trim() === '') {
      return false;
    }
    if (this.formInformation.pwd1 !== this.formInformation.pwd2) {
      return false;
    }
    return true;
  }
}
