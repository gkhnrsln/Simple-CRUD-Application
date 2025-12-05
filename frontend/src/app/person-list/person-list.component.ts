import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PersonService } from '../shared/service/person.service';
import { PersonListItemComponent } from '../person-list-item/person-list-item.component';
import { RouterLink } from '@angular/router';
import { Person } from '../model/person';
import { LoggedinOnlyDirective } from '../shared/loggedin-only.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  imports: [RouterLink, PersonListItemComponent, LoggedinOnlyDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  private readonly personService = inject(PersonService);

  private readonly personsRaw = toSignal<Person[] | null>(
    this.personService.getAllPersons().pipe(catchError(() => of(null))),
    { initialValue: null },
  );

  readonly persons = signal<Person[]>([]);
  readonly loading = computed(() => this.personsRaw() === null);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const raw = this.personsRaw();
      if (raw === null) {
        this.error.set('Failed to load persons.');
        this.persons.set([]);
      } else {
        this.error.set(null);
        this.persons.set(raw);
      }
    });
  }

  removePerson(id: string) {
    this.persons.update((list) => list.filter((p) => p.id !== id));
  }
}
