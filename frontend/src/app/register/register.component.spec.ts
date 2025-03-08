import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../shared/service/auth.service';
import { UserService } from '../shared/service/user.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterService } from '../shared/service/toaster.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let userService: jasmine.SpyObj<UserService>;
  let toasterService: jasmine.SpyObj<ToasterService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);
    userService = jasmine.createSpyObj<UserService>('UserService', ['register']);
    toasterService = jasmine.createSpyObj('ToasterService', ['show'])
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService },
        { provide: ToasterService, useValue: toasterService },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.onSubmit();
    expect(userService.register).not.toHaveBeenCalled();
  });

  it('should register a user and navigate on success', () => {
    component.registerForm.setValue({ userName: 'testUser', password: 'StrongP@ss1' });
    userService.register.and.returnValue(of('Success'));
    authService.login.and.returnValue(of({ token: 'test-token' }));

    component.onSubmit();

    expect(toasterService.show).toHaveBeenCalledWith('Success', 'You have been registered.');
    expect(userService.register).toHaveBeenCalledWith('testUser', 'StrongP@ss1');
    expect(authService.login).toHaveBeenCalledWith('testUser', 'StrongP@ss1');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle username taken error', () => {
    component.registerForm.setValue({ userName: 'testUser', password: 'StrongP@ss1' });
    userService.register.and.returnValue(throwError(() => ({ status: 409, error: { error: 'Username taken' } })));

    component.onSubmit();

    expect(toasterService.show).toHaveBeenCalledWith('Error', 'Username taken');
    expect(component.usernameTakenError).toBe('Username taken');
  });

  it('should handle generic error', () => {
    component.registerForm.setValue({ userName: 'testUser', password: 'StrongP@ss1' });
    userService.register.and.returnValue(throwError(() => 'Server error'));

    component.onSubmit();

    expect(toasterService.show).toHaveBeenCalledWith('Error', 'Server error');
    expect(component.errorMessage).toBe('Server error');
  });
});
