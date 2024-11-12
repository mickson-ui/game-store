import { Component, Input } from '@angular/core';
import { GameCardComponent } from "../game-card/game-card.component";
import { CommonModule } from '@angular/common';
import { Game } from '../shared/models/game.interface';


@Component({
  selector: 'app-game-carousel',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-carousel.component.html',
  styleUrl: './game-carousel.component.scss'
})
export class GameCarouselComponent {
  @Input() categoryTitle: string = '';
  @Input() games: Game[] = [];

  currentIndex: number = 0;

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.games.length - 1) {
      this.currentIndex++;
    }
  }
}
