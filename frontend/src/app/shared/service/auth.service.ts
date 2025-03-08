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
  username: string | null = null;


  constructor() {
    const token = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('username');
    if (token && storedUsername) {
      this._isAuthenticated$.next(true);
      this.username = storedUsername;
    }
  }

  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('username', username);
        this.username = username;
        this._isAuthenticated$.next(true); 
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.username = null;
    this._isAuthenticated$.next(false);
  }

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }
}
