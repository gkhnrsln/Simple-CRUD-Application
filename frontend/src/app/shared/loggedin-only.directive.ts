import { Directive, effect, inject, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "./service/auth.service";

@Directive({
  selector: '[appLoggedinOnly]'
})
export class LoggedinOnlyDirective {
  private readonly authService = inject(AuthService);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated) {
        this.viewContainer.createEmbeddedView(this.template);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}