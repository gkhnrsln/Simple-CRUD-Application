import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { provideRouter } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { provideHttpClient } from '@angular/common/http';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    sessionStorage.removeItem('theme');
    await TestBed.configureTestingModule({
      imports: [MenuComponent, LoginComponent],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the theme to dark if the saved theme in sessionStorage is dark', () => {
    sessionStorage.setItem('theme', 'dark');

    component.ngOnInit();

    expect(component.isDarkMode).toBe(true);
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  it('should set the theme to light if the saved theme in sessionStorage is light', () => {
    sessionStorage.setItem('theme', 'light');

    component.ngOnInit();

    expect(component.isDarkMode).toBe(false);
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  it('should set the theme based on time if no theme is saved in sessionStorage', () => {
    const currentHour = new Date().getHours();
    
    component.ngOnInit();

    if (currentHour >= 19 || currentHour < 7) {
      expect(component.isDarkMode).toBe(true);
      expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
    } else {
      expect(component.isDarkMode).toBe(false);
      expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
    }
  });

  it('should toggle the theme and update sessionStorage and the document element', () => {
    component.toggleDarkMode();

    expect(component.isDarkMode).toBe(true);
    expect(sessionStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');

    component.toggleDarkMode();

    expect(component.isDarkMode).toBe(false);
    expect(sessionStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });
});
