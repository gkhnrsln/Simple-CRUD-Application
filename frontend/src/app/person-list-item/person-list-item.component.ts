import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
})
export class PersonListItemComponent {
  private readonly personService = inject(PersonService);
  private readonly toasterService = inject(ToasterService);
  @Input() person!: Person;
  @Output() deleted = new EventEmitter<string>();

  deletePerson(id: string) {
    this.personService.deletePerson(id).subscribe(() => {
      this.toasterService.show('Success', `Person with id ${id} was deleted`);
      this.deleted.emit(this.person.id);
    });
  }
}
