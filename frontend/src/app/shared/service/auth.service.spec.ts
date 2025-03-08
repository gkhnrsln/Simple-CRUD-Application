import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user on successful login and add token and username to sessionStorage', () => {
    const {username, password} = {username: 'user', password: 'password'};
    const mockResponse = { token: 'test-token' };
    
    service.login(username, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(sessionStorage.getItem('token')).toEqual('test-token');
      expect(sessionStorage.getItem('username')).toEqual('user');
      expect(service.username).toEqual(username);
      expect(service.isAuthenticated).toBeTrue();
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log out and remove token and username from sessionStorage', () => {
    sessionStorage.setItem('token', 'test-token');
    sessionStorage.setItem('username', 'user');

    service.logout();

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('username')).toBeNull();
    expect(service.username).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });
});
