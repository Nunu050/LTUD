export interface Food {
  id: string;
  name: string;
  emoji: string;
  category: string;
  imageUrl: string;
  description: string;
  moodMatch?: string[];
}

export interface Mood {
  id: string;
  title: string;
  emoji: string;
  color: string;
  psychology: string;
  foods: Food[];
}

export interface Restaurant {
  id: string | number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  image?: string;
}

export interface Review {
  id?: string;
  userId?: string;
  mood: string;
  food: string;
  restaurant: string;
  review: string;
  rating: number;
  favorite: boolean;
  imageUrl?: string;
  createdAt?: any;
}
