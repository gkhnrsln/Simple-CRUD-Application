import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly strongPasswordRegx: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  title = 'Register';
  errorMessage: string | null = null;
  usernameTakenError: string | null = null;

  registerForm = new FormGroup({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$')
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.strongPasswordRegx)
      ]
    }),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const {userName, password} = this.registerForm.getRawValue();
    this.userService.register(userName, password).subscribe({
      next: (response) => {
        console.log('Registration succesful:', response)
        this.authService.login(userName, password).subscribe(
          () => {
            this.router.navigate(['/home']);
          }
        )
      }, error: (err) => {
        if (err.status === 409) {
          this.usernameTakenError = err.error.error;
        }
        console.error('Registration error:', err)
        this.errorMessage = err;
      }
    });
  }
}
