import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
   
  register(userName: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, {userName, password});
  }
}
