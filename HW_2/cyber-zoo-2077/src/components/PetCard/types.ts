export type Mood = 'happy' | 'neutral' | 'sad' | 'offline';

export interface Pet {
  id: number;
  name: string;
  species: string;
  mood: Mood;
  energy: number;
  level: number;
  avatar: string;
}
