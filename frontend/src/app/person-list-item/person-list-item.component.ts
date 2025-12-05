import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { Person } from '../model/person';
import { DatePipe } from '@angular/common';
import { PersonService } from '../shared/service/person.service';
import { RouterLink } from '@angular/router';
import { LoggedinOnlyDirective } from '../shared/loggedin-only.directive';
import { ToasterService } from '../shared/service/toaster.service';

@Component({
  selector: '[app-person-list-item]',
  imports: [DatePipe, RouterLink, LoggedinOnlyDirective],
  templateUrl: './person-list-item.component.html',
  styleUrl: './person-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListItemComponent {
  readonly person = input.required<Person>();
  readonly deleted = output<string>();
  private readonly personService = inject(PersonService);
  private readonly toasterService = inject(ToasterService);

  deletePerson(id: string) {
    this.personService.deletePerson(id).subscribe(() => {
      this.toasterService.show('Success', `Person with id ${id} was deleted`);
      this.deleted.emit(this.person().id);
    });
  }
}
