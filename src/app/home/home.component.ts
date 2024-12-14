import { Component, OnInit } from '@angular/core';
import { GameCarouselComponent } from "../game-carousel/game-carousel.component";
import { Game } from '../shared/models/game.interface';
import { GameService } from '../shared/services/game.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameCarouselComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allGames: Game[] = [];
  trendingGames: Game[] = [];

  isLoading: boolean = false;

  constructor(private gameService: GameService, private router: Router) {}
  ngOnInit(): void {
    this.gameService.getAllGames().subscribe({
      next: (data) => {
        this.allGames = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching all games:', error);
        this.isLoading = false;
      }
    })
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/game-categories', category]);
  }
}
