import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string);
  if (!value) { return null; }
  const isValidEmail = /^[a-zA-Z0-9\.-]{4,}@\w+\.com$/.test(value);
  return isValidEmail ? null : { emailValidator: true };
};

function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
  return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
    const areTheSame = targetControl.value === control.value;
    return areTheSame ? null : { rePasswordValidator: true };
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(6)]);

    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: passwordControl,
      repeatPassword: ['', [Validators.required, Validators.minLength(6), rePasswordValidatorFactory(passwordControl)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    })
  }

  submitHandler(): void {
    const data = this.form.value;
    this.auth.register(data.email, data.password)
    this.router.navigate([''])
  }
}
