import { Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'home', canActivate: [AuthGuard], loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'game-library', loadComponent: () => import('./game-library/game-library.component').then(m => m.GameLibraryComponent), canActivate: [AuthGuard] },
  { path: 'wishlist', loadComponent: () => import('./game-wishlist/game-wishlist.component').then(m => m.GameWishlistComponent), canActivate: [AuthGuard] },
  { path: 'cart', loadComponent: () => import('./game-cart/game-cart.component').then(m => m.GameCartComponent), canActivate: [AuthGuard] },
  { path: 'game/:id', loadComponent: () => import('./game-details/game-details.component').then(m => m.GameDetailsComponent), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./game-login/game-login.component').then(m => m.GameLoginComponent) },
  { path: 'signup', loadComponent: () => import('./game-signup/game-signup.component').then(m => m.GameSignupComponent) },
  { path: 'game-categories/:categoryName', loadComponent: () => import('./game-categories/game-categories.component').then(m => m.GameCategoriesComponent), canActivate: [AuthGuard] },
];
