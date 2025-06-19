import { Component, inject } from '@angular/core';
import { PersonService } from '../shared/service/person.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-person-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.scss'
})
export class PersonDetailsComponent {
  private readonly personService = inject(PersonService);
  private readonly route = inject(ActivatedRoute);

  person = toSignal(
    this.personService.getPerson(
      this.route.snapshot.paramMap.get('id')!
    ), 
    { initialValue: null }
  );
}