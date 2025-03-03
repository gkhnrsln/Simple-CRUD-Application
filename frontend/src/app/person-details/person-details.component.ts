import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonService } from '../shared/service/person.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Person } from '../model/person';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-person-details',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent {
  private readonly personService = inject(PersonService);
  private readonly route = inject(ActivatedRoute);

  person$: Observable<Person>;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.person$ = this.personService.getPerson(id);
  }
}
