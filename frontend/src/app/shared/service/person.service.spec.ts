import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Person } from 'src/app/model/person';
import { environment } from 'src/environments/environment';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve persons from the API via GET', () => {
    const dummyPersons: Person[] = [
      { id: "1", firstName: 'John', lastName: 'Doe', birthday: new Date()},
      { id: "2", firstName: 'Jane', lastName: 'Smith', birthday: new Date() }
    ];

    service.getAllPersons().subscribe(persons => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(dummyPersons);
    })

    const request = httpMock.expectOne(`${environment.apiUrl}/persons`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPersons);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
