import { Subject } from 'rxjs';
import { LoggedinOnlyDirective } from './loggedin-only.directive';
import { AuthService } from './service/auth.service';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('LoggedinOnlyDirective', () => {
  let authState$: Subject<boolean>;
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let templateRefMock: jasmine.SpyObj<TemplateRef<unknown>>;
  let directive: LoggedinOnlyDirective;

  beforeEach(() => {
    authState$ = new Subject<boolean>();
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { isAuthenticated$: authState$.asObservable() } },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: TemplateRef, useValue: templateRefMock },
        LoggedinOnlyDirective
      ]
    });

    directive = TestBed.inject(LoggedinOnlyDirective);
  });

  it('should create an embedded view if authenticated', () => {
    authState$.next(true);
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should clear the view if not authenticated', () => {
    authState$.next(false);
    expect(viewContainerRefMock.clear).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const completeSpy = spyOn(directive['destroy$'], 'next');
    directive.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
