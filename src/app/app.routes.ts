import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {path: 'game-library', loadComponent: () => import('./game-library/game-library.component').then(m => m.GameLibraryComponent) },
  {path: 'game/:id', loadComponent: () => import('./game-details/game-details.component').then(m => m.GameDetailsComponent) },
];
