import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
  registerErr = undefined;
  
  constructor(
    private fb: FormBuilder,
    private auth: UserService,
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

  async submitHandler() {
    const data = this.form.value;
    this.isLoading = true;
    this.registerErr = undefined;
    try {
      let user = await this.auth.register(data.email, data.password);
      await user.user.updateProfile({
        displayName: `${data.firstName} ${data.lastName}` 
      })
      await this.auth.setCart(data.email, [])
      this.router.navigate([''])        
    } catch (err) {
      this.registerErr = err.message;     
    } finally {
      this.isLoading = false;
    }   
  }
}
