import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonListComponent } from './person-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PersonListComponent ],
      providers: [
        provideHttpClient(),
        provideRouter([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    component.persons.set([{
      id: '1', firstName: 'John',
      lastName: 'Doe',
      birthday: new Date('2000-01-01')
    }, {
      id: '2', firstName: 'Alice',
      lastName: 'Smith',
      birthday: new Date('2000-01-01')
    }]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove the person with the given id', () => {
    component.removePerson('1');

    expect(component.persons()).toEqual([{
      id: '2', firstName: 'Alice',
      lastName: 'Smith',
      birthday: new Date('2000-01-01')
    }]);
  });
});
