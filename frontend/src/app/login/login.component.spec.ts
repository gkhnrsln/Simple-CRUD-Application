import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../shared/service/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        {
          provide: AuthService, useValue: authService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('userName')?.value).toBe('Username');
    expect(component.loginForm.get('password')?.value).toBe('Password');
  });

  it('should not submit if form is invalid', () => {
    component.loginForm.get('userName')?.setValue('');
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should login on submit', () => {
    authService.login.and.returnValue(of({ token: 'test-token'}));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('Username', 'Password');
  });

  it('should handle login error', () => {
    authService.login.and.returnValue(throwError(() => 'Login failed'));

    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed');
  });
});
