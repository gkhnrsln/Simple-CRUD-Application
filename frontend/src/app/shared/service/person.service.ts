import { inject, Injectable } from '@angular/core';
import { Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Person } from 'src/app/model/person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
 
  getAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/persons`).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/persons/${id}`);
  }

  deletePerson(id: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/persons/${id}`);
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiUrl}/persons`, person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/persons/${person.id}`, person);
  }
}
