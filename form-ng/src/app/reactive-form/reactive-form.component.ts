import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { debounce, debounceTime, filter } from 'rxjs';

@Component({
             selector: 'app-reactive-form',
             imports: [
               JsonPipe,
               ReactiveFormsModule,
             ],
             templateUrl: './reactive-form.component.html',
             styleUrl: './reactive-form.component.scss',
           })
export class ReactiveFormComponent {
  formGroup = new FormGroup(
    {
      username: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
      pwd1: new FormControl<string>('', [Validators.minLength(10)]),
      pwd2: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.email]),
      locationSearch: new FormControl<string>('')
    }, [
      (form: AbstractControl) => {

      let formG = form as FormGroup;
      return formG.controls['pwd1'].value === formG.controls['pwd2'].value ? null : {passwwordMatch: 'nope'}
      }
    ]
  );

  constructor() {
    this.formGroup.controls.locationSearch.valueChanges.pipe(
      filter(value => (value??'').length > 3),
      debounceTime(500)
    ).subscribe(value => {
      console.log('api call', "search for " + value);
    })
  }

  public register() {
    alert(JSON.stringify(this.formGroup.value))
  }
}
