import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private readonly toasterSubject = new BehaviorSubject<{ type: string, message: string } | null>(null);
  toaster$ = this.toasterSubject.asObservable();

  show(type: string, message: string): void {
    this.toasterSubject.next({ type, message });
    setTimeout(() => {
      this.toasterSubject.next(null);
    }, 5000);
  }
}
