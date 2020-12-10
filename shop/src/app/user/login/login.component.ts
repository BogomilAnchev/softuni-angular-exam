import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
  loginErr = undefined;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: UserService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async submitHandler() {
    const data = this.form.value;
    this.isLoading = true;
    this.loginErr = undefined
    try {
      await this.auth.login(data.email, data.password);
      this.router.navigate([''])          
    } catch (err) {
      if (err.message === 'The password is invalid or the user does not have a password.') {
        this.loginErr = 'The password is invalid!'
      };
      if (err.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        this.loginErr = 'Invalid email!'
      }   
    } finally {
      this.isLoading = false;
    }   
  }
}
