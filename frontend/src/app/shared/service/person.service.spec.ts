import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Person } from 'src/app/model/person';
import { environment } from 'src/environments/environment';

describe('PersonService', () => {
  let service: PersonService;
  let httpMock: HttpTestingController;
  let dummyPersons: Person[] = [
    { id: "1", firstName: 'John', lastName: 'Doe', birthday: new Date('2000-01-01')},
    { id: "2", firstName: 'Jane', lastName: 'Smith', birthday: new Date('2000-01-01') }
  ];

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

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve persons from the API via GET', () => {
    service.getAllPersons().subscribe(persons => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(dummyPersons);
    })

    const request = httpMock.expectOne(`${environment.apiUrl}/persons`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPersons);
  });

  it('should retrieve person from the API via GET', () => {
    service.getPerson("1").subscribe(person => {
      expect(person).toEqual(dummyPersons[0]);
    })

    const request = httpMock.expectOne(`${environment.apiUrl}/persons/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPersons[0]);
  });

  it('should delete person from the API via DELETE', () => {
    service.deletePerson("1").subscribe();

    const request = httpMock.expectOne(`${environment.apiUrl}/persons/1`);
    expect(request.request.method).toBe('DELETE');
  });

  it('should add person from the API via POST', () => {
    service.addPerson(dummyPersons[0]).subscribe(person => {
      expect(person).toEqual(dummyPersons[0]);
    })

    const request = httpMock.expectOne(`${environment.apiUrl}/persons`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyPersons[0]);
  });

  it('should update person from the API via PUT', () => {
    service.updatePerson(dummyPersons[0]).subscribe(person => {
      expect(person).toEqual(dummyPersons[0]);
    })

    const request = httpMock.expectOne(`${environment.apiUrl}/persons/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(dummyPersons[0]);
  });
});
