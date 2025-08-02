import { LoggedinOnlyDirective } from './loggedin-only.directive';
import { AuthService } from './service/auth.service';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('LoggedinOnlyDirective', () => {
  let authServiceMock: { isAuthenticated: boolean };
  let viewContainerRefMock: jasmine.SpyObj<ViewContainerRef>;
  let templateRefMock: jasmine.SpyObj<TemplateRef<unknown>>;
  let directive: LoggedinOnlyDirective;

  beforeEach(() => {
    authServiceMock = { isAuthenticated: false };
    viewContainerRefMock = jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView', 'clear']);
    templateRefMock = jasmine.createSpyObj('TemplateRef', ['']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ViewContainerRef, useValue: viewContainerRefMock },
        { provide: TemplateRef, useValue: templateRefMock },
        LoggedinOnlyDirective
      ]
    });

    directive = TestBed.inject(LoggedinOnlyDirective);
    (directive as any).triggerEffect = () => {
      if (authServiceMock.isAuthenticated) {
        viewContainerRefMock.createEmbeddedView(templateRefMock);
      } else {
        viewContainerRefMock.clear();
      }
    };
  });

  it('should create an embedded view if authenticated', () => {
    authServiceMock.isAuthenticated = true;
    (directive as any).triggerEffect();
    expect(viewContainerRefMock.createEmbeddedView).toHaveBeenCalledWith(templateRefMock);
  });

  it('should clear the view if not authenticated', () => {
    authServiceMock.isAuthenticated = false;
    (directive as any).triggerEffect();
    expect(viewContainerRefMock.clear).toHaveBeenCalled();
  });
});
