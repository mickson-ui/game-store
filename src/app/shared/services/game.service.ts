import { Injectable } from '@angular/core';
import { Cart, Game, Wishlist } from '../models/game.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly API_BASE_URL = 'http://localhost:5032/api/v1';

  constructor(private http: HttpClient) { }

 /**
   * Fetch all games from the API.
   */
  getAllGames(): Observable<Game[]> {
    return this.http.get<{ isSuccessful: boolean; responseCode: string; responseMessage: string; games: Game[] }>(
      `${this.API_BASE_URL}/game/all`
    ).pipe(
      map((response) => response.games) // Extract the games array from the response
    );
  }
 /**
   * Fetch game details by ID from the API.
   */
  getGameDetails(id: string): Observable<Game> {
    return this.http.get<{ isSuccessful: boolean; responseCode: string; responseMessage: string; game: Game }>(
      `${this.API_BASE_URL}/game/by-id/${id}`
    ).pipe(
      map((response) => response.game) // Extract the game object from the response
    );
  }

  getRelatedGames(): Game[] {
    return this.relatedGames;
  }

  getTopGames(): Game[] {
    return this.topGames;
  }

  getCartItems(): Observable<Cart[]> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    return this.http.get<{ isSuccessful: boolean; responseCode: string; responseMessage: string; cart: Cart[] }>(
      `${this.API_BASE_URL}/cart/all`,
      { headers }
    ).pipe(
      map((response) => {
        console.log('Cart Response:', response);
        return response.cart;
      })
    );
  }

  // Add game to cart
  addToCart(game: Game): Observable<any> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('API Call: Adding game to cart with ID:', game.id); // Debugging ID

    return this.http.post(`${this.API_BASE_URL}/cart`, { gameId: game.id }, { headers });
  }

  removeFromCart(id: string): Observable<any> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('API Call: Removing cart item with ID:', id); // Debugging
    return this.http.delete(`${this.API_BASE_URL}/cart/${id}`, { headers });
  }

  getWishlistItems(): Observable<Wishlist[]> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    return this.http.get<{ isSuccessful: boolean; responseCode: string; responseMessage: string; cart: Wishlist[] }>(
      `${this.API_BASE_URL}/wish-list/all`,
      { headers }
    ).pipe(
      map((response) => {
        console.log('Wishlist Response:', response); // Debugging
        return response.cart; // Map directly to Wishlist[]
      })
    );
  }

  // Add game to wishlist
  addToWishlist(game: Game): Observable<any> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('API Call: Adding game to wishlist with ID:', game.id); // Debugging ID

    return this.http.post(`${this.API_BASE_URL}/wish-list`, { gameId: game.id }, { headers });
  }

  removeFromWishlist(id: string): Observable<any> {
    const token = localStorage.getItem('game_store_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('API Call: Removing wishlist item with ID:', id); // Debugging ID

    return this.http.delete(`${this.API_BASE_URL}/wish-list/${id}`, { headers });
  }




  getTrendingGames(): Game[] {
    return this.trendingGames;
  }




  // private gameDetails: Game[] = [
  //   ...this.allGames,
  // ]

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
    // {
    //   id: '1',
    //   title: 'FC25',
    //   logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
    //   image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
    //   price: '$59.99',
    //   baseGame: 'Base Game',
    //   discount: '10% off',
    //   originalPrice: '$69.99',
    //   playAvailable: true
    // },
    // {
    //   id: '6',
    //   title: 'Game 2',
    //   logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
    //   image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
    //   price: '$49.99',
    //   baseGame: 'Base Game',
    //   playAvailable: false
    // }
  ]

  private wishlist: Game[] = [
    // {
    //   id: '1',
    //   title: 'FC25',
    //   logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
    //   image: 'https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-07/GSsc6tlXEAAIkdw.jpeg?itok=tCNZDdB0',
    //   price: '$59.99',
    //   baseGame: 'Base Game',
    //   discount: '10% off',
    //   originalPrice: '$69.99',
    //   playAvailable: true
    // },
    // {
    //   id: '6',
    //   title: 'Game 2',
    //   logo: 'https://fifauteam.com/images/fc25/logo/long-green.webp',
    //   image: 'https://store-images.s-microsoft.com/image/apps.17225.71371076658790719.f03e633a-c24b-4548-a357-e08218cd4846.f45d21b3-c1aa-44f2-b6cb-d39d41d7f3d4',
    //   price: '$49.99',
    //   baseGame: 'Base Game',
    //   playAvailable: false
    // }
  ]
}
