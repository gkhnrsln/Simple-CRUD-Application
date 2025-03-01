import { Directive, inject, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appLoggedinOnly]',
  standalone: true
})
export class LoggedinOnlyDirective implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.viewContainer.createEmbeddedView(this.template);
        } else {
          this.viewContainer.clear();
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
