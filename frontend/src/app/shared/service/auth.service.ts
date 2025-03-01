import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly _isAuthenticated$ = new BehaviorSubject(false);
  readonly isAuthenticated$ = this._isAuthenticated$.asObservable(); 

  constructor() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this._isAuthenticated$.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        this._isAuthenticated$.next(true);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this._isAuthenticated$.next(false);
  }

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }
}
