import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonCreateComponent } from './person-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/shared/service/person.service';
import { Person } from 'src/app/model/person';
import { of } from 'rxjs';
import { ToasterService } from 'src/app/shared/service/toaster.service';

describe('PersonCreateComponent', () => {
  let component: PersonCreateComponent;
  let fixture: ComponentFixture<PersonCreateComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let toasterServiceSpy: jasmine.SpyObj<ToasterService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['addPerson']);
    toasterServiceSpy = jasmine.createSpyObj('ToasterService', ['show']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: {} } });

    await TestBed.configureTestingModule({
      imports: [PersonCreateComponent],
      providers: [
        { provide: PersonService, useValue: personServiceSpy },
        { provide: ToasterService, useValue: toasterServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should call personService.addPerson and navigate on create', () => {
    const mockPerson: Person = {
      id: "1", 
      firstName: 'John Doe',
      lastName: '',
      birthday: new Date('2000-01-01')
    };
    personServiceSpy.addPerson.and.returnValue(of(mockPerson));

    component.create(mockPerson);

    expect(personServiceSpy.addPerson).toHaveBeenCalledWith(mockPerson);
    expect(toasterServiceSpy.show).toHaveBeenCalledWith('Success', 'Person was created');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/persons', mockPerson.id]);
  });
});
