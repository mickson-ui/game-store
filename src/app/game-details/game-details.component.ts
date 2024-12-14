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

  constructor(private gameService: GameService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.loadGameDetails();
    this.relatedGames = this.gameService.getRelatedGames();
  }

  private loadGameDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameService.getGameDetails(id).subscribe(gameDetails => {
        if (gameDetails) {
          this.game = {
            ...gameDetails,
            gameLink: 'https://example.com/playgame'
          };
        } else {
          console.error('Game not found with id:', id);
        }
      });
    } else {
      console.error('No id found in route');
    }
  }


  buyNow(): void {
    if (!this.game) return;
    console.log('Buying:', this.game.title);
    // Logic for buying the game
    this.game.playAvailable = true; // Set playAvailable to true after purchase
    this.showPurchaseSuccess = true;
  }

  playNow(): void {
    if (!this.game) return;
    console.log('Loading:', this.game.title);

    // Check for internet connection
  if (navigator.onLine) {
    console.log('Playing:', this.game.title);
    // Open the game link in a new tab
    window.open(this.game.gameLink, '_blank');
  } else {
    // Display an error message
    console.error('No internet connection. Cannot play the game.');
    // alert('You need an active internet connection to play this game.');
    this.showInternentConnection = true
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
