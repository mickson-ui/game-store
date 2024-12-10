import { Game } from './../shared/models/game.interface';
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
  @Input() myLibrary: Game[] = [];

  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.getMyGames();
  }

  getMyGames(): void{
    this.myLibrary = this.gameService.getAllGames();
  }

}
