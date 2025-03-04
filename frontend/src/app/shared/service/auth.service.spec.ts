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

  it('should authenticate user on successful login', () => {
    const mockResponse = { token: 'test-token' };
    
    service.login('user', 'password').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(service.isAuthenticated).toBeTrue();
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should log out and remove token', () => {
    sessionStorage.setItem('token', 'test-token');

    service.logout();

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });
});
