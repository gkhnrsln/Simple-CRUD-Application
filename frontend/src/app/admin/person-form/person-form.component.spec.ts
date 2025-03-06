import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonFormComponent } from './person-form.component';
import { Person } from 'src/app/model/person';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PersonFormComponent ]
    })
    .compileComponents();
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
      phone: '+9876543210'
    };

    component.person = mockPerson;
    component.ngOnChanges();

    expect(component.firstName?.value).toBe('Bob');
    expect(component.lastName?.value).toBe('Jones');
    expect(component.mail?.value).toBe('bob@abc.com');
    expect(component.personForm.get('birthday')?.value).toBe(mockPerson.birthday);
  });

});