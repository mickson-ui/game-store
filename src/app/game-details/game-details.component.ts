import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { GameCarouselComponent } from "../game-carousel/game-carousel.component";
import { Game } from '../shared/models/game.interface';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, GameCarouselComponent],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit {
  @Input() game: Game = {} as Game;

  relatedGames: Game[] = [];

  constructor(private gameSerive: GameService){}

  ngOnInit(): void{
    this.relatedGames = this.gameSerive.getRelatedGames();
  }


  selectedTab: string = 'overview';
  selectTab(tab: string) {
    console.log('Selected tab:', tab);
    this.selectedTab = tab;
  }

  playTrailer() {
    console.log('Playing trailer for:', this.game.title);
    // Logic to play the trailer
  }

  subscribe() {
    console.log('Subscribed to:', this.game.title);
    // Logic for subscribing
  }

  buyNow() {
    console.log('Buying:', this.game.title);
    // Logic for buying the game
  }

  addToCart() {
    console.log('Added to cart:', this.game.title);
    // Logic for adding to cart
  }

  addToWishlist() {
    console.log('Added to wishlist:', this.game.title);
    // Logic for adding to wishlist
  }

}
