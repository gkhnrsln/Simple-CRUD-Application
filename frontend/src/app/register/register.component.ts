import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { ToasterService } from '../shared/service/toaster.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToasterService);
  private readonly strongPasswordRegx: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  readonly errorMessage = signal<string | null>(null);
  readonly usernameTakenError = signal<string | null>(null);

  readonly registerForm = new FormGroup({
    userName: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.strongPasswordRegx),
      ],
    }),
  });

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }

    const { userName, password } = this.registerForm.getRawValue();

    try {
      await firstValueFrom(this.userService.register(userName, password));
      this.toastService.show('Success', 'You have been registered.');

      await firstValueFrom(this.authService.login(userName, password));
      await this.router.navigate(['/home']);
    } catch (err: unknown) {
      const e = err as { status?: number; error?: { error?: string } };
      const message = e.error?.error ?? 'Unexprected error.';
      if (e.status === 409) {
        this.usernameTakenError.set(message);
      } else {
        this.errorMessage.set(message);
      }
      this.toastService.show('Error', message);
    }
  }
}
