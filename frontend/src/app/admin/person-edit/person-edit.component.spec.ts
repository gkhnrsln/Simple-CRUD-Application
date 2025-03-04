import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonEditComponent } from './person-edit.component';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { PersonService } from 'src/app/shared/service/person.service';
import { of } from 'rxjs';
import { Person } from 'src/app/model/person';

describe('PersonEditComponent', () => {
  let component: PersonEditComponent;
  let fixture: ComponentFixture<PersonEditComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  const mockPerson: Person = {
    id: "1", 
    firstName: 'John Doe',
    lastName: '',
    birthday: new Date('2000-01-01')
  };
  
  beforeEach(async () => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['getPerson', 'updatePerson']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      paramMap: of({ get: () => '1' })
    });

    await TestBed.configureTestingModule({
      imports: [PersonEditComponent],
      providers: [
        provideRouter([]),
        { provide: PersonService, useValue: personServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();    

    fixture = TestBed.createComponent(PersonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch person on initialization', () => {
    personServiceSpy.getPerson.and.returnValue(of(mockPerson));

    component.person$.subscribe(person => {
      expect(person).toEqual(mockPerson);
    });
    fixture.detectChanges();
  });

  it('should navigate after updating person', () => {
    personServiceSpy.updatePerson.and.returnValue(of(mockPerson));

    component.update(mockPerson);

    expect(personServiceSpy.updatePerson).toHaveBeenCalledWith(mockPerson);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/persons', mockPerson.id]);
  });
});
