import { Component, inject } from '@angular/core';
import { QuotesService } from '../shared/service/quotes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly quotesService = inject(QuotesService);
  title = 'Home';
  quotes = this.quotesService.quotes;
}
