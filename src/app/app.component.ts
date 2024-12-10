import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game-store';
  showHeader: boolean = false;

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide the header for specific routes
        this.showHeader = !['/login', '/signup'].includes(event.urlAfterRedirects);
      }
    });
  }
}
