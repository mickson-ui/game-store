import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {path: 'game-library', loadComponent: () => import('./game-library/game-library.component').then(m => m.GameLibraryComponent) },
  {path: 'wishlist', loadComponent: () => import('./game-wishlist/game-wishlist.component').then(m => m.GameWishlistComponent) },
  {path: 'cart', loadComponent: () => import('./game-cart/game-cart.component').then(m => m.GameCartComponent) },
  {path: 'game/:id', loadComponent: () => import('./game-details/game-details.component').then(m => m.GameDetailsComponent) },
  {path: 'login', loadComponent: () => import('./game-login/game-login.component').then(m => m.GameLoginComponent) },
  {path: 'signup', loadComponent: () => import('./game-signup/game-signup.component').then(m => m.GameSignupComponent) },
  {path: 'game-categories/:categoryName', loadComponent: () => import('./game-categories/game-categories.component').then(m => m.GameCategoriesComponent) },
];
