import { Component, inject, OnInit } from '@angular/core';
import { ToasterService } from '../shared/service/toaster.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit {
  toasterService = inject(ToasterService);
  message: { type: string, message : string} | null = null;

  ngOnInit(): void {
    this.toasterService.toaster$.subscribe(message => {
      this.message = message;

      if (this.message) {
        setTimeout(() => {
          this.initializeToasts();
        }, 100);
      }
    });
  }

  private initializeToasts() {
    const toastElList = document.querySelectorAll('.toast');
    const toastList = Array.from(toastElList).map(toastEl => new bootstrap.Toast(toastEl));
    toastList.forEach(toast => toast.show());
  }
}
