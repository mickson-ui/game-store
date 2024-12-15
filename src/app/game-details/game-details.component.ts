import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { Game } from '../shared/models/game.interface';
import { GameService } from '../shared/services/game.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrl: './game-details.component.scss'
})
export class GameDetailsComponent implements OnInit {
  @Input() game: Game = {} as Game;
  relatedGames: Game[] = [];
  selectedTab: string = 'overview';

  showPurchaseSuccess: boolean = false;
  showCartSuccess: boolean = false;
  showWishlistSuccess: boolean = false;
  showInternentConnection: boolean = false;

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadGameDetails();
    this.relatedGames = this.gameService.getRelatedGames();
  }

  private loadGameDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameService.getGameDetails(id).subscribe({
        next: (gameDetails) => {
          if (gameDetails) {
            this.game = {
              ...gameDetails,
              gameLink: gameDetails.gameLink || this.constructGameLink(gameDetails.id),
            };

            // Check if the game is in the purchased list
            const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');
            if (purchasedGames.includes(this.game.id)) {
              this.game.playAvailable = true;
            }

            console.log('Loaded game details:', this.game);
          } else {
            console.error('Game not found with id:', id);
          }
        },
        error: (err) => {
          console.error('Error loading game details:', err);
        },
      });
    } else {
      console.error('No id found in route');
    }
  }


  private constructGameLink(id: string): string {
    // Dynamically construct a game link using the game ID
    return `https://store.mygames.com/game/${id}`;
  }

  playNow(): void {
    if (!this.game) return;
    console.log('Loading:', this.game.title);

    if (navigator.onLine) {
      if (this.game.gameLink) {
        console.log('Playing:', this.game.title);
        window.open(this.game.gameLink, '_blank'); // Open the game in a new tab
      } else {
        console.error('No game link available for:', this.game.title);
        alert('Game link is not available for this game.');
      }
    } else {
      console.error('No internet connection. Cannot play the game.');
      this.showInternentConnection = true;
    }
  }

  closePopup(event: Event, type: string): void {
    const target = event.target as HTMLElement;

    // Close only if the click is outside the popup content
    if (target.classList.contains('popup-container') || target.tagName === 'BUTTON') {
      if (type === 'cart') this.showCartSuccess = false;
      if (type === 'wishlist') this.showWishlistSuccess = false;
      if (type === 'purchase') this.showPurchaseSuccess = false;
      if (type === 'play') this.showPurchaseSuccess = false;
    }
  }



  addToCart(): void {
    if (!this.game || this.game.inCart) {
      console.log('Game already in cart or invalid:', this.game?.title);
      return;
    }

    console.log('Adding to cart with ID:', this.game.id); // Debugging ID

    this.gameService.addToCart(this.game).subscribe({
      next: () => {
        this.game.inCart = true;
        this.showCartSuccess = true;
        console.log('Game successfully added to cart:', this.game.title);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      },
    });
  }


  buyNow(): void {
    if (!this.game || this.game.playAvailable) {
      console.log('Game already in library or invalid:', this.game?.title);
      return;
    }
    console.log('Buying:', this.game.title);
    this.gameService.buyGame(this.game.id).subscribe({
      next: () => {
        this.game.playAvailable = true;
        this.showPurchaseSuccess = true;
        console.log('Game successfully added to library:', this.game.title);

        // Persist purchased state in localStorage
        const purchasedGames = JSON.parse(localStorage.getItem('purchasedGames') || '[]');
        purchasedGames.push(this.game.id);
        localStorage.setItem('purchasedGames', JSON.stringify(purchasedGames));
        console.log('Purchased games:', purchasedGames);
      },
      error: (err) => {
        console.error('Error buying game:', err);
      },
    });
  }


  addToWishlist(): void {
    if (!this.game) return;

    console.log('Checking wishlist for game ID:', this.game.id); // Debugging ID

    this.gameService.getWishlistItems().subscribe({
      next: (wishlist) => {
        const alreadyInWishlist = wishlist.some((item) => item.id === this.game.id);
        if (alreadyInWishlist) {
          console.log('Game already in wishlist:', this.game.title);
          this.showWishlistSuccess = false;
          alert('This game is already in your wishlist.');
          return;
        }

        console.log('Adding to wishlist with ID:', this.game.id); // Debugging ID
        this.gameService.addToWishlist(this.game).subscribe({
          next: () => {
            this.game.inWishlist = true;
            this.showWishlistSuccess = true;
            console.log('Game successfully added to wishlist:', this.game.title);
          },
          error: (err) => {
            console.error('Error adding to wishlist:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching wishlist:', err);
      },
    });
  }



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

  share(){
    console.log('Sharing:', this.game.title);
    // Logic for sharing
  }

  report(){
    console.log('Reporting:', this.game.title);
    // Logic for reporting
  }

}
