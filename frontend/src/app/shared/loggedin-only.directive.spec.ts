import { Subject } from 'rxjs';
import { LoggedinOnlyDirective } from './loggedin-only.directive';
import { AuthService } from './service/auth.service';
import { TemplateRef, ViewContainerRef } from '@angular/core';

describe('LoggedinOnlyDirective', () => {
  let directive: LoggedinOnlyDirective;
  let authService: jasmine.SpyObj<AuthService>;
  let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;
  let templateRef: jasmine.SpyObj<TemplateRef<unknown>>;
  let authState$: Subject<boolean>;

  beforeEach(() => {
    authState$ = new Subject<boolean>();
    authService = jasmine.createSpyObj('AuthService', [''], { isAuthenticated$: authState$.asObservable() });
    viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    templateRef = jasmine.createSpyObj('TemplateRef', ['']);

    directive = new LoggedinOnlyDirective(authService, viewContainerRef, templateRef);
  });

  it('should create an embedded view if authenticated', () => {
    authState$.next(true);
    
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
  });

  it('should clear the view if not authenticated', () => {
    authState$.next(false);

    expect(viewContainerRef.clear).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = spyOn(authState$, 'unsubscribe');
    directive.ngOnDestroy();
    directive['destroy$'].complete();

    expect(spy).not.toHaveBeenCalled();
  });
});
