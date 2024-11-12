import { Component } from '@angular/core';
import { GameCarouselComponent } from "../game-carousel/game-carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
