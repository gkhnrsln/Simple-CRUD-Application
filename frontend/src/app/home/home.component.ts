import { Component, inject } from '@angular/core';
import { QuotesService } from '../shared/service/quotes.service';
import { Observable } from 'rxjs';
import { Quote } from '../model/quote';
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly quotesService = inject(QuotesService);
  title = 'Home';
  quotes$: Observable<Quote[]>;

  constructor() {
    this.quotes$ = this.quotesService.getQuotes();
  }

}
