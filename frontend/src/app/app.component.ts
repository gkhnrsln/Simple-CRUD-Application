import { Component } from '@angular/core';
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { RouterOutlet } from '@angular/router';
import { ToasterComponent } from "./toaster/toaster.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      FooterComponent,
      MenuComponent,
      RouterOutlet,
      ToasterComponent
    ]
})
export class AppComponent {
  title = 'Simple CRUD Application';
}
