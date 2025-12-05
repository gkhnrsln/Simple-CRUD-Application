import { Component, input, output, OnChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Person } from 'src/app/model/person';
import { birthdayValidator } from 'src/app/shared/validators/birthdayValidator';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  imports: [ReactiveFormsModule],
})
export class PersonFormComponent implements OnChanges {
  readonly person = input<Person | undefined>();
  readonly submitPerson = output<Person>();

  ngOnChanges(): void {
    if (this.person()) {
      this.setFormValues(this.person()!);
    }
  }

  personForm = new FormGroup({
    firstName: new FormControl('John', {
      nonNullable: true,
      validators: Validators.required,
    }),
    lastName: new FormControl('Doe', {
      nonNullable: true,
      validators: Validators.required,
    }),
    birthday: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required, birthdayValidator()],
    }),
    mail: new FormControl('example@abc.com', {
      nonNullable: true,
      validators: Validators.email,
    }),
    phone: new FormControl('+0123456789', {
      nonNullable: true,
    }),
  });

  get firstName() {
    return this.personForm.get('firstName');
  }

  get lastName() {
    return this.personForm.get('lastName');
  }

  get mail() {
    return this.personForm.get('mail');
  }

  get birthday() {
    return this.personForm.get('birthday');
  }

  onSubmit() {
    const formValue = this.personForm.getRawValue();

    const newPerson: Person = {
      id: this.person()?.id ?? Date.now().toString(),
      ...formValue,
    };
    this.submitPerson.emit(newPerson);
  }

  private setFormValues(person: Person) {
    this.personForm.patchValue(person);
  }
}
