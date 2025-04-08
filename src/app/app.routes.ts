import { Routes } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import {authGuard} from './core/guards/auth.guard';
import {UserDetailsComponent} from './pages/home/users-list/user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'shell'
  },
  {
    path: 'shell',
    component: ShellComponent,
    children: [
      {
        path: 'auth',
        component: AuthComponent
      },
      {
        path: 'home',
        canActivate: [authGuard],
        children: [
          { path: '', component: HomeComponent }
        ]
      },
      {
        path: 'adduser',
        canActivate: [authGuard],
        component: AddUserComponent
      },
      {
        path: 'user-details/:id',
        canActivate: [authGuard],
        component: UserDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'auth' // or show a 404 component if needed
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'shell'
  }
];
