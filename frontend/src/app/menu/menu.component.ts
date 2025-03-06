import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, LoginComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  auth = inject(AuthService);
  isDarkMode = false;

  ngOnInit() {
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      const hours = new Date().getHours();
      this.isDarkMode = hours >= 19 || hours < 7;
    }

    this.updateTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    sessionStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme() {
    document.documentElement.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
