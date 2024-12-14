import { AuthService } from './../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavOpen = false

  showHeader: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide the header for specific routes
        this.showHeader = !['/login', '/signup'].includes(event.urlAfterRedirects);
      }
    });
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen
  }
}
