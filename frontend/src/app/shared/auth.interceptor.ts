import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated) {
    const reqWithToken = req.clone({
      headers: req.headers.append('X-Authentication-Token', authService.getAuthToken()),
    });
    console.log(reqWithToken.url);
    return next(reqWithToken);
  } else {
    console.log(req.url);
    return next(req);
  }
};
