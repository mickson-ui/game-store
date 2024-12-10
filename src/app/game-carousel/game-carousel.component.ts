import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() categoryClicked = new EventEmitter<string>();

  currentIndex: number = 0;

  // How many cards are visible in the viewport at once
  visibleCards: number = 5;


  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  onCategoryTitleClick(){
    this.categoryClicked.emit(this.categoryTitle);
  }

  nextSlide() {
    // Calculate how many steps we can go to the right
    const maxIndex = this.games.length - this.visibleCards;
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }
  }

  getTransform(): string {
    // Assuming each card is the same width.
    // Adjust the card width and spacing as per your styles.
    const cardWidth = 200; // px (example)
    const gap = 16; // px (example)
    const totalCardWidth = cardWidth + gap;
    const translateX = -this.currentIndex * totalCardWidth;
    return `translateX(${translateX}px)`;
  }
}
