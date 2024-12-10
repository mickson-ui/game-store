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

  getCartItems(): Game[] {
    return this.cartItems;
  }

  getWishlistItems(): Game[] {
    return this.wishlist;
  }

  getTrendingGames(): Game[] {
    return this.trendingGames;
  }

  // Add game to cart
  addToCart(game: Game): void {
    if(!this.cartItems.find(item => item.id == game.id)){
      this.cartItems.push(game)
      console.log('Added to cart:', game.title);
    }else{
      console.log('Already in cart:', game.title);
    }
  }


  // Remove game from cart
  removeFromCart(gameId: String): void {
    const initialLength = this.cartItems.length;
    this.cartItems = this.cartItems.filter(item => item.id !== gameId);
    if(this.cartItems.length < initialLength){
      console.log(`Game with ID ${gameId} has been removed from the cart.`);
    }else{
      console.log(`Game with ID ${gameId} not found in the cart.`)
    }
  }

  // Add game to wishlist
  addToWishlist(game: Game): void {
    if(!this.wishlist.find(item => item.id == game.id)){
      this.wishlist.push(game)
      console.log('Added to wishlist:', game.title);
    }else{
      console.log('Already in wishlist:', game.title);
    }
  }

  //Remove game from wishlist
  removeFromWishlist(id: string): void {
    const initialLength = this.wishlist.length;
    this.wishlist = this.wishlist.filter(item => item.id !== id);
    if (this.wishlist.length < initialLength) {
      console.log(`Game with ID ${id} has been removed from the wishlist.`);
    } else {
      console.log(`Game with ID ${id} not found in the wishlist.`);
    }
  }



  private allGames: Game[] = [
    {
      id: '1',
      title: 'FC25',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
      price: '$49.99',
      rating: 4.5,
      tags: ['All Games', 'Football', 'Sports', 'Trending Now'],
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
      tags: ['RPG', 'Fantasy', 'Trending Now'],
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
      tags: ['All Games','RPG', 'Fantasy', 'Trending Now'],
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
      tags: ['RPG', 'Fantasy', 'Trending Now'],
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
      tags: ['Football', 'Sports', 'Trending Now'],
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
      tags: ['Football', 'Sports', 'Trending Now'],
      playAvailable: false,
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      id: '7',
      title: 'Game 7',
      logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
      image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
      price: '$49.99',
      baseGame: 'Base Game',
      tags: ['Football', 'Sports', 'Trending Now'],
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
      playAvailable: true
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
    },

  ];

  private cartItems: Game[] = [
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
  ]

  private wishlist: Game[] = [
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
  ]
}
