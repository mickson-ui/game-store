export interface Game {
  id: string;
  title: string;
  image: string;
  price: string;
  rating?: number;
  tags?: string[];
  description?: string;
  baseGame?: string;
  discount?: string;
  originalPrice?: string;
  playAvailable?: boolean;
  videoUrl?: string;
}
