import { Game, Library } from './../shared/models/game.interface';
import { Component, Input, OnInit } from '@angular/core';
import { GameCardComponent } from "../game-card/game-card.component";
import { GameService } from "../shared/services/game.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-library',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './game-library.component.html',
  styleUrl: './game-library.component.scss'
})
export class GameLibraryComponent implements OnInit {
  // @Input() myLibrary: Library = {} as Library;
  libraryItems: Game[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.fetchLibraryGame();
  }
  fetchLibraryGame(): void {
    this.gameService.getLibraryItems().subscribe({
      next: (library: any[]) => { // Use 'any[]' to accept the raw API response
        console.log('Fetched Library Items:', library);
        this.libraryItems = library.map((item) => ({
          id: item.gameId, // Use the unique library item ID as the Game ID
          title: item.gameTitle || 'Unknown Title', // Map gameTitle to title
          image: item.gameImage || 'assets/default-image.jpg', // Default image if missing
          logo: '', // Add a default or placeholder value
          price: item.gamePrice || 'Free', // Map gamePrice to price
          rating: 0, // Add a default rating if not available
          tags: [], // Add an empty array for tags
          description: '', // Add an empty description
          baseGame: '', // Add a default or empty value
          discount: '', // Add a default or empty value
          originalPrice: '', // Add a default or empty value
          playAvailable: true, // Explicitly set playAvailable
          inCart: false, // Default inCart state
          inWishlist: false, // Default inWishlist state
          videoUrl: '', // Add a default or empty value
          reward: '', // Add a default or empty value
          refundPolicy: '', // Add a default or empty value
          incompatible: false, // Default incompatible state
          gameLink: '', // Add a default or empty value
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching library items:', err);
        this.errorMessage = 'Failed to load library items.';
        this.isLoading = false;
      },
    });
  }

}
