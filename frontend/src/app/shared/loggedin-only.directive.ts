import { Directive, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appLoggedinOnly]'
})
export class LoggedinOnlyDirective implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly authService: AuthService,
              private readonly viewContainer: ViewContainerRef,
              private readonly template: TemplateRef<unknown>) {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => this.updateView(isAuthenticated));
  }

  private updateView(isAuthenticated: boolean): void {
    isAuthenticated ? this.viewContainer.createEmbeddedView(this.template) : this.viewContainer.clear();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
