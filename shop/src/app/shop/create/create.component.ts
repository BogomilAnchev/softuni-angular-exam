import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';

function checkPrice(control: AbstractControl): ValidationErrors | null {
  let val = control.value;
  if (val === null || val === '') return null;
  if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'checkPrice': true };
  return null;
};

function checkUrl(control: AbstractControl): ValidationErrors | null {
  let val = control.value;
  if (val === null || val === '') return null;
  if (!val.toString().match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) return { 'checkUrl': true };
  return null;
};

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form: FormGroup
  isLoading: boolean = false

  constructor(fb: FormBuilder, router: RouterModule) {
    this.form = fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      price: ['', [Validators.required, checkPrice]],
      imageUrl: ['', [Validators.required, checkUrl]],
      description: ['', [Validators.required, Validators.minLength(50)]]
    })
  }

  submitHandler() {
    console.log(this.form.value);

  }
}
