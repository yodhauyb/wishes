export interface Photo {
  id: string;
  url: string; // base64 or Unsplash URL or object URL
  caption: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  photoUrl?: string; // base64 or Unsplash URL
  date: string;
}

export type ThemeType = 'romantic' | 'cute' | 'elegant' | 'colorful' | 'minimal' | 'ocean' | 'vintage' | 'neon';
// NAYA: Event Types add kiye hain
export type EventType = 'birthday' | 'anniversary' | 'rakshabandhan' | 'valentines';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  accentClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
  iconColor: string;
}

export interface BirthdayData {
  id: string;
  slug: string;
  eventType: EventType; // NAYA: Data mein event track karne ke liye
  name: string;
  birthdayDate?: string;
  senderName: string;
  intro: string;
  message: string;
  letter: string;
  theme: ThemeType;
  music?: string;
  photos: Photo[];
  memories: Memory[];
}