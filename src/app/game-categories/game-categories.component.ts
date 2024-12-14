import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { Game } from '../shared/models/game.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameCardComponent } from "../game-card/game-card.component";

@Component({
  selector: 'app-game-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, GameCardComponent],
  templateUrl: './game-categories.component.html',
  styleUrl: './game-categories.component.scss'
})
export class GameCategoriesComponent implements OnInit {
  categoryName: string = '';

  games: Game[] = [];

  constructor(private gameService: GameService, private route: ActivatedRoute){}

  ngOnInit(): void {
    // Subscribe to route params to handle changes, if you navigate between categories
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName') || '';
      this.filterGamesByCategory();
    });
  }

  filterGamesByCategory(): void {
    this.gameService.getAllGames().subscribe(allGames => {
      if (this.categoryName) {
        this.games = allGames.filter((game: Game) => game.tags && game.tags.includes(this.categoryName));
      } else {
        this.games = [];
      }
    });
  }

  // ngOnChanges(): void {
  //   this.filterGamesByCategory();
  // }

  // filterGamesByCategory(): void {
  //   const allGames = this.gameService.getAllGames();

  //   // Filter games that have the selected category in their tags array
  //   if (this.category) {
  //     this.games = allGames.filter(game => game.tags && game.tags.includes(this.category));
  //   } else {
  //     // If no category is provided, you could either show all games or none
  //     this.games = allGames;
  //   }
  // }
}
