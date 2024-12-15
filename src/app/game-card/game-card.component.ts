import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Game } from '../shared/models/game.interface';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() game: Game = {} as Game;

  showInternentConnection: boolean = false;

  playNow(): void {
    if (!this.game) return;

    if (navigator.onLine) {
      if (this.game.gameLink) {
        console.log('Playing:', this.game.title);
        // Open the game in a new tab
        window.open(this.game.gameLink, '_blank');
      } else {
        console.error('No game link available for:', this.game.title);
        alert('Game link is not available.');
      }
    } else {
      console.error('No internet connection. Cannot play the game.');
      this.showInternentConnection = true; // Show an error message
    }
  }

  closeInternetPopup(): void {
    this.showInternentConnection = false;
  }
}
