export interface Game {
  id: string;
  title: string;
  image: string;
  logo: string;
  price: string;
  rating?: number;
  tags?: string[];
  description?: string;
  baseGame?: string;
  discount?: string;
  originalPrice?: string;
  playAvailable?: boolean;
  inCart?: boolean;
  inWishlist?: boolean;
  videoUrl?: string;
  reward?: string;
  refundPolicy?: string;
  incompatible?: boolean;
  gameLink?: string; // Add this property
}

export interface Wishlist {
  id: string; // Unique ID for the wishlist item
  userId: string;
  gameId: string;
  gameTitle: string;
  gamePrice: string;
  gameImage?: string;
}

export interface Cart {
  id: string;
  userId: string;
  gameId: string;
  gameTitle: string;
  gamePrice: string;
  gameImage?: string;
}

export interface Library extends Game {
  id: string;
  userId: string;
  gameId: string;
  gameTitle: string;
  gamePrice: string;
  gameImage?: string;
}
