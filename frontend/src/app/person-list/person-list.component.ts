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
    standalone: true,
    imports: [
      RouterLink,
      PersonListItemComponent,
      LoggedinOnlyDirective
    ]
})
export class PersonListComponent {
  private readonly personService = inject(PersonService);
  title = 'Table of Persons';
  persons = signal<Person[]>([]);

  constructor() {
    this.personService.getAllPersons().subscribe((data) => {
      this.persons.set(data);
    });
  }

  removePerson(id: string) {
    this.persons.set(this.persons().filter(p => p.id !== id));
  }
}
