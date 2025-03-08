import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../shared/service/auth.service';
import { of, throwError } from 'rxjs';
import { ToasterService } from '../shared/service/toaster.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let toasterService: jasmine.SpyObj<ToasterService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    toasterService = jasmine.createSpyObj('ToasterService', ['show']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authService },
        { provide: ToasterService, useValue: toasterService },
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
    expect(toasterService.show).toHaveBeenCalledWith('Success', 'Login successful');
  });

  it('should handle login error', () => {
    authService.login.and.returnValue(throwError(() => ({ status: 500, error: { error: 'Login failed' } })));

    component.onSubmit();

    expect(component.errorMessage).toBe('Login failed');
    expect(toasterService.show).toHaveBeenCalledWith('Error', 'Login failed');
  });
});
