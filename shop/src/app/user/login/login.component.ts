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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  submitHandler() {
    const data = this.form.value;
    this.auth.login(data.email, data.password);
    this.router.navigate([''])
  }
}
