import { Component, OnInit } from '@angular/core';
import { GameCarouselComponent } from "../game-carousel/game-carousel.component";
import { Game } from '../shared/models/game.interface';
import { GameService } from '../shared/services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  topGames: Game[] = [];
  trendingGames: Game[] = [];

  constructor(private gameService: GameService) {}
  ngOnInit(): void {
    this.topGames = this.gameService.getTopGames();
    this.trendingGames = this.gameService.getTrendingGames();
  }
}
