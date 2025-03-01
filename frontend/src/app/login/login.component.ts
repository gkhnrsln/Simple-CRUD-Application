import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup({
    userName: new FormControl('Username', {
      nonNullable: true,
      validators: Validators.required
    }),
    password: new FormControl('Password', {
      nonNullable: true,
      validators: Validators.required
    }),
  });


  onSubmit() {
    const formValue = this.loginForm.getRawValue();
    this.authService.login(formValue.userName, formValue.password).pipe(
      catchError(err => {
        window.alert('Login failed. Please try again.');
        throw of(null);
      })
    ).subscribe(token => {
      console.log('Login successful with token: ', token);
    });
  }
}
