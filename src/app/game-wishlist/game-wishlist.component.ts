import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameService } from '../shared/services/game.service';
import { Game, Wishlist } from '../shared/models/game.interface';
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
  wishlistItems: Wishlist[] = [];
  isLoading = true;
  errorMessage = '';

  selectedSort: string = 'On Sale';
  sortOptions: string[] = ['On Sale', 'Recently Added', 'Alphabetical', 'Price: Low to High', 'Price: High to Low'];

  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.gameService.getWishlistItems().subscribe({
      next: (wishlist: Wishlist[]) => {
        console.log('Fetched Wishlist:', wishlist); // Debugging
        this.wishlistItems = wishlist; // Directly assign the fetched wishlist
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err); // Debugging
        this.errorMessage = 'Failed to load wishlist items.';
        this.isLoading = false;
      },
    });
  }

  removeFromWishlist(id: string): void {
    if (!id) return;

    this.gameService.removeFromWishlist(id).subscribe({
      next: () => {
        console.log('Successfully removed from wishlist:', id);
        // Update frontend state immediately
        this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error('Error removing from wishlist:', err);
      },
    });
  }

  addToCart() {
    if(!this.game) return;
    console.log('Added to cart:', this.game.title);
    this.gameService.addToCart(this.game);
  }


  // sortGames() {
  //   switch (this.selectedSort) {
  //     case 'On Sale':
  //       this.games = this.games.sort((a, b) => parseFloat(b.discount || '0') - parseFloat(a.discount || '0'));
  //       break;
  //     case 'Recently Added':
  //       // Logic for sorting recently added (if you have a date field)
  //       break;
  //     case 'Alphabetical':
  //       this.games = this.games.sort((a, b) => a.title.localeCompare(b.title));
  //       break;
  //     case 'Price: Low to High':
  //       this.games = this.games.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
  //       break;
  //     case 'Price: High to Low':
  //       this.games = this.games.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
  //       break;
  //   }
  // }



}
