import { Component, inject, signal } from '@angular/core';
import { PersonService } from "../shared/service/person.service";
import { PersonListItemComponent } from "../person-list-item/person-list-item.component";
import { RouterLink } from '@angular/router';
import { Person } from '../model/person';
import { LoggedinOnlyDirective } from '../shared/loggedin-only.directive';

@Component({
  selector: 'app-persons',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  imports: [
    RouterLink,
    PersonListItemComponent,
    LoggedinOnlyDirective
  ]
})
export class PersonListComponent {
  private readonly personService = inject(PersonService);
  persons = signal<Person[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  constructor() {
    this.personService.getAllPersons().subscribe({
      next: data => {
        this.persons.set(data);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Failed to load persons.');
        this.loading.set(false);
      }
    });
  }
  removePerson(id: string) {
    this.persons.set(this.persons().filter(p => p.id !== id));
  }
}
