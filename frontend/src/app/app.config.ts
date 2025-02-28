import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { authInterceptor } from "./shared/auth.interceptor";
import { routes } from "./shared/app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        provideRouter(routes),
    ],
};