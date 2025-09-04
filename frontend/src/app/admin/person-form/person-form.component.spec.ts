import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { Person } from 'src/app/model/person';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.personForm.value.firstName).toBe('John');
    expect(component.personForm.value.lastName).toBe('Doe');
    expect(component.personForm.value.mail).toBe('example@abc.com');
    expect(component.personForm.value.phone).toBe('+0123456789');
  });

  it('should update the form when ngOnChanges is called with a person', () => {
    const mockPerson: Person = {
      id: '2',
      firstName: 'Bob',
      lastName: 'Jones',
      birthday: new Date('1990-01-01'),
      mail: 'bob@abc.com',
      phone: '+9876543210',
    };

    fixture.componentRef.setInput('person', mockPerson);
    component.ngOnChanges();

    expect(component.firstName?.value).toBe('Bob');
    expect(component.lastName?.value).toBe('Jones');
    expect(component.mail?.value).toBe('bob@abc.com');
    expect(component.personForm.get('birthday')?.value).toBe(
      mockPerson.birthday,
    );
  });

  it('should emit submitPerson with correct values on submit', () => {
    const emitSpy = spyOn(component.submitPerson, 'emit');
    component.personForm.setValue({
      firstName: 'Alice',
      lastName: 'Smith',
      birthday: new Date('2000-05-15'),
      mail: 'alice@abc.com',
      phone: '+49123456789',
    });

    fixture.componentRef.setInput('person', undefined);

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        firstName: 'Alice',
        lastName: 'Smith',
        birthday: new Date('2000-05-15'),
        mail: 'alice@abc.com',
        phone: '+49123456789',
        id: jasmine.any(String),
      }),
    );
  });
});
