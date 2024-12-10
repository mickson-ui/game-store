import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { Game } from '../shared/models/game.interface';

@Component({
  selector: 'app-game-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-cart.component.html',
  styleUrl: './game-cart.component.scss'
})
export class GameCartComponent implements OnInit {
  cartItems: Game[] = [];

  constructor( private gameService: GameService) {}

  ngOnInit(): void {
    this.cartItems = this.gameService.getCartItems();
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  }

  removeFromCart(gameId: string) {
    if (!gameId) return;
    this.gameService.removeFromCart(gameId);
    this.cartItems = this.gameService.getCartItems();
  }
}
