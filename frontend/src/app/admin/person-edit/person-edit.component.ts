import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Person } from 'src/app/model/person';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';
import { PersonService } from 'src/app/shared/service/person.service';
import { ToasterService } from 'src/app/shared/service/toaster.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-person-edit',
  imports: [PersonFormComponent, RouterLink],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonEditComponent {
  private readonly personService = inject(PersonService);
  private readonly toasterService = inject(ToasterService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly person = toSignal<Person | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.personService.getPerson(id)),
    ),
    { initialValue: null },
  );

  update(person: Person) {
    this.personService.updatePerson(person).subscribe({
      next: (updatedPerson) => {
        this.toasterService.show('Success', 'Person was updated');
        this.router.navigate(['/persons', updatedPerson.id]);
      },
      error: () => {
        this.toasterService.show('Error', 'Failed to update person');
      },
    });
  }
}
