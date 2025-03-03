import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';
import { PersonService } from 'src/app/shared/service/person.service';
import { Person } from 'src/app/model/person';

@Component({
  selector: 'app-person-create',
  imports: [PersonFormComponent, RouterLink],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.scss'
})
export class PersonCreateComponent {
  private readonly personService = inject(PersonService);
  private readonly router = inject(Router);
  
  create(person: Person) {
    this.personService.addPerson(person).subscribe(response => {
      this.router.navigate(['/persons', response.id]);
    });
  }
}
