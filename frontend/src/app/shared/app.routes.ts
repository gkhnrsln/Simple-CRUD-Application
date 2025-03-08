import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from '../register/register.component';

export const routes: Routes = [
    { 
      path: '', 
      redirectTo: 'home', 
      pathMatch: "full"
    },{ 
      path: 'home', 
      component: HomeComponent,
      title: 'Home'
    },{ 
      path: 'register', 
      component: RegisterComponent,
      title: 'Register'
    },{
      path: 'persons',
      loadChildren: () =>
        import('../persons/persons.routes')
          .then(mod => mod.PERSONS_ROUTES)
    },{
      path: 'admin',
      loadChildren: () =>
        import('../persons/admin.routes')
          .then(mod => mod.ADMIN_ROUTES),
      canActivate: [authGuard],
    },
  ];
  