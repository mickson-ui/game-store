import { CommonModule } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { GameCarouselComponent } from "../game-carousel/game-carousel.component";
import { Game } from '../shared/models/game.interface';
import { GameService } from '../shared/services/game.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


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

  constructor(private gameService: GameService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.loadGameDetails();
    this.relatedGames = this.gameService.getRelatedGames();
  }

  private loadGameDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const gameDetails = this.gameService.getGameDetails(id);
      if(gameDetails){
        this.game = gameDetails;
      }else{
        console.error('Game not found with id:', id);
      }
    }else{
      console.error('No id found in route');
    }
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
