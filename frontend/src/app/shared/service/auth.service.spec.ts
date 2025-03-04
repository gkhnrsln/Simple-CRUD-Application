import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log out and remove token', () => {
    sessionStorage.setItem('token', 'test-token');
    
    service.logout();

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(service.isAuthenticated).toBeFalse();
  });
});
