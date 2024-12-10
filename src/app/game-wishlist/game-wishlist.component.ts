import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameService } from '../shared/services/game.service';
import { Game } from '../shared/models/game.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './game-wishlist.component.html',
  styleUrl: './game-wishlist.component.scss'
})
export class GameWishlistComponent implements OnInit {
  @Input() game: Game = {} as Game;
  games: Game[] = [];

  selectedSort: string = 'On Sale';
  sortOptions: string[] = ['On Sale', 'Recently Added', 'Alphabetical', 'Price: Low to High', 'Price: High to Low'];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.games = this.gameService.getWishlistItems();
  }
  sortGames() {
    switch (this.selectedSort) {
      case 'On Sale':
        this.games = this.games.sort((a, b) => parseFloat(b.discount || '0') - parseFloat(a.discount || '0'));
        break;
      case 'Recently Added':
        // Logic for sorting recently added (if you have a date field)
        break;
      case 'Alphabetical':
        this.games = this.games.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Price: Low to High':
        this.games = this.games.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'Price: High to Low':
        this.games = this.games.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
    }
  }

  addToCart() {
    if(!this.game) return;
    console.log('Added to cart:', this.game.title);
    this.gameService.addToCart(this.game);
  }

  removeFromWishlist(gameId: string) {
    if (!gameId) return;
    this.gameService.removeFromWishlist(gameId);
    this.games = this.gameService.getWishlistItems();
  }
}
