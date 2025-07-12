import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListItemComponent } from './person-list-item.component';
import { provideHttpClient } from '@angular/common/http';
import { PersonService } from '../shared/service/person.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '../shared/service/toaster.service';

describe('PersonListItemComponent', () => {
  let component: PersonListItemComponent;
  let fixture: ComponentFixture<PersonListItemComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let toasterServiceSpy: jasmine.SpyObj<ToasterService>;


  beforeEach(async () => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['deletePerson']);
    toasterServiceSpy = jasmine.createSpyObj('ToasterService', ['show'])

    await TestBed.configureTestingModule({
      imports: [PersonListItemComponent],
      providers: [
        provideHttpClient(),
        { provide: PersonService, useValue: personServiceSpy },
        { provide: ToasterService, useValue: toasterServiceSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonListItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('person', { id: '1', firstName: 'John Doe' , lastName: 'Doe', birthday: new Date('2000-01-01') });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deletePerson and emit deleted event', () => {
    spyOn(component.deleted, 'emit');
    personServiceSpy.deletePerson.and.returnValue(of({}));

    component.deletePerson('1');

    expect(toasterServiceSpy.show).toHaveBeenCalledWith('Success', `Person with id 1 was deleted`);
    expect(personServiceSpy.deletePerson).toHaveBeenCalledWith('1');
    expect(component.deleted.emit).toHaveBeenCalledWith('1');
  });

});
