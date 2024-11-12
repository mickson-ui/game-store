import { Injectable } from '@angular/core';
import { Game } from '../models/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  private relatedGames: Game[] = [
    {
      title: 'Game 1',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      rating: 4.5,
      tags: ['Action', 'Adventure'],
      description: 'A thrilling action-adventure game.',
      discount: '10% off',
    },
    {
      title: 'Game 2',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$39.99',
      rating: 4.0,
      tags: ['RPG', 'Fantasy'],
      description: 'An immersive role-playing game.',
    }
  ];

  private topGames: Game[] = [
    {
      title: 'Game 1',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true
    },
    {
      title: 'Game 2',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false
    }
  ];

  private trendingGames: Game[] = [
    {
      title: 'Game 1',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true
    },
    {
      title: 'Game 2',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false
    }
  ];

  getRelatedGames(): Game[] {
    return this.relatedGames;
  }

  getTopGames(): Game[] {
    return this.topGames;
  }

  getTrendingGames(): Game[] {
    return this.trendingGames;
  }
}
