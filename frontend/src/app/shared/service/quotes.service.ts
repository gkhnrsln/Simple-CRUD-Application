import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quote } from 'src/app/model/quote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private readonly apiURL = 'https://api.api-ninjas.com/v1';
  private readonly apiKey = environment.apiKey;

  /**
   * Fetches quotes from the API.
   * 
   * @returns An observable of an array of Quote objects.
   */  
  quotes = httpResource<Quote[]>(() => ({
    url: `${this.apiURL}/quotes`,
    headers: {
      'X-Api-Key': this.apiKey
    },
  }));
}
