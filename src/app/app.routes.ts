import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'people',
    children: [
      { path: '', loadComponent: () => import('./pages/people/list-people/list-people.component').then(m => m.ListPeopleComponent) },
      { path: 'new', loadComponent: () => import('./pages/people/edit-people/edit-people.component').then(m => m.EditPeopleComponent) },
      { path: ':id/edit', loadComponent: () => import('./pages/people/edit-people/edit-people.component').then(m => m.EditPeopleComponent) },
      { path: ':id', loadComponent: () => import('./pages/people/detail-people/detail-people.component').then(m => m.DetailPeopleComponent) }
    ]
  }
];
