import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { Cart, Game } from '../shared/models/game.interface';

@Component({
  selector: 'app-game-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-cart.component.html',
  styleUrl: './game-cart.component.scss'
})
export class GameCartComponent implements OnInit {
  @Input() cart: Cart = {} as Cart;
  cartItems: Cart[] = [];
  isLoading = true;
  errorMessage = '';

  constructor( private gameService: GameService) {}

  ngOnInit(): void {
   this.fetchCartlist();
  }

  fetchCartlist(): void {
    this.gameService.getCartItems().subscribe({
      next: (cart: Cart[]) => {
        console.log('Fetched Cart:', cart); // Debugging
        this.cartItems = cart;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching cart items:', err); // Debugging
        this.errorMessage = 'Failed to load cart items.';
        this.isLoading = false;
      },
    });
  }

  get totalPrice(): number {
    return this.cartItems.reduce((total: number, item: Cart) => total + parseFloat(item.gamePrice.replace('$', '')), 0);
  }

  removeFromCart(id: string): void {
    if (!id) return;

    this.gameService.removeFromCart(id).subscribe({
      next: () => {
        console.log('Successfully removed from cart:', id);
        // Update frontend state immediately
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
      },
      error: (err) => {
        console.error('Error removing from cart:', err);
      },
    });
  }
}
