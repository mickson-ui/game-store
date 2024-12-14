import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    console.log('AuthGuard: Checking authentication...');
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('AuthGuard: isAuthenticated:', isAuthenticated);

    if (isPlatformBrowser(this.platformId)) {
      if (isAuthenticated) {
        console.log('AuthGuard: User is authenticated.');
        return true;
      } else {
        console.log('AuthGuard: User is not authenticated. Redirecting to login...');
        localStorage.setItem('returnUrl', window.location.pathname); // Save return URL
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      console.log('AuthGuard: Not running in a browser environment.');
      return false;
    }
  }

}
