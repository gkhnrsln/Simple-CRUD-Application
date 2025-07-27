import { Directive, OnDestroy, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appLoggedinOnly]'
})
export class LoggedinOnlyDirective implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => this.updateView(isAuthenticated));
  }

  private updateView(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      this.viewContainer.createEmbeddedView(this.template)
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
