import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = sessionStorage.getItem('token');

  if (authService.isAuthenticated && token) {
    req = req.clone({ 
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
