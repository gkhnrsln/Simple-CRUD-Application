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
  errorMessage: string | null = null;

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
    if (this.loginForm.invalid) {
      return;
    }

    const formValue = this.loginForm.getRawValue();
    this.authService.login(formValue.userName, formValue.password).pipe(
      catchError(() => {
        this.errorMessage = 'Login failed. Please retry.';
        return of(null);
      })
    ).subscribe(response => {
      sessionStorage.setItem('token', response!.token);
    });
  }
}
