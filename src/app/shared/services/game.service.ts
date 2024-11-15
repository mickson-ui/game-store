import { Injectable } from '@angular/core';
import { Game } from '../models/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }


  getAllGames(): Game[] {
    return this.allGames;
  }
  getGameDetails(id: string): Game | undefined {
    return this.gameDetails.find(game => game.id === id);
  }
  getRelatedGames(): Game[] {
    return this.relatedGames;
  }

  getTopGames(): Game[] {
    return this.topGames;
  }

  getTrendingGames(): Game[] {
    return this.trendingGames;
  }



  private allGames: Game[] = [
    {
      id: '1',
      title: 'FC25',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
      price: '$49.99',
      rating: 4.5,
      tags: ['Football', 'Sports'],
      description: 'A thrilling action-adventure game.',
      discount: '10% off',
      videoUrl: 'https://www.shutterstock.com/shutterstock/videos/1105910851/preview/stock-footage-aalesund-more-and-romsdal-norway-color-line-stadium-aalesund-arena-aerial-of.webm'

    },
    {
      id: '2',
      title: 'Game 2',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$39.99',
      rating: 4.0,
      tags: ['RPG', 'Fantasy'],
      description: 'An immersive role-playing game.',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: '3',
      title: 'Game 3',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: '4',
      title: 'Game 4',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: '5',
      title: 'Game 5',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: '6',
      title: 'Game 6',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    }
  ]

  private gameDetails: Game[] = [
    ...this.allGames,
  ]

  private relatedGames: Game[] = [
    {
      id: '1',
      title: 'FC25',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
      price: '$49.99',
      rating: 4.5,
      tags: ['Action', 'Adventure'],
      description: 'A thrilling action-adventure game.',
      discount: '10% off',
    },
    {
      id: '2',
      title: 'Game 2',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$39.99',
      rating: 4.0,
      tags: ['RPG', 'Fantasy'],
      description: 'An immersive role-playing game.',
    }
  ];

  private topGames: Game[] = [
    {
      id: '1',
      title: 'FC25',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true
    },
    {
      id: '4',
      title: 'Game 2',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false
    }
  ];

  private trendingGames: Game[] = [
    {
      id: '1',
      title: 'FC25',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
      price: '$59.99',
      baseGame: 'Base Game',
      discount: '10% off',
      originalPrice: '$69.99',
      playAvailable: true
    },
    {
      id: '6',
      title: 'Game 2',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      playAvailable: false
    }
  ];
}
