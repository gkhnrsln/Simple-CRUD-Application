import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, LoginComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  auth = inject(AuthService);
}
