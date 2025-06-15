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
  private _username: string | null = null;

  constructor() {
    this.loadSession();
  }

  private loadSession(): void {
    const token = sessionStorage.getItem('token');
    const storedUsername = sessionStorage.getItem('username');
    if (token && storedUsername) {
      this._isAuthenticated$.next(true);
      this._username = storedUsername;
    }
  }

  login(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, {username, password}).pipe(
      tap(response => {
        this.handleLoginSuccess(response.token, username);
      })
    );
  }

  private handleLoginSuccess(token: string, username: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    this._username = username;
    this._isAuthenticated$.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this._username = null;
    this._isAuthenticated$.next(false);
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated$.value;
  }

  get username(): string | null {
    return this._username;
  }
}
