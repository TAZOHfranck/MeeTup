export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  photos: string[];
  isPremium: boolean;
  isOnline: boolean;
  lastSeen?: Date;
  interests: string[];
  lookingFor: string;
  gender: 'male' | 'female' | 'other';
  occupation?: string;
  education?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Match {
  id: string;
  users: [string, string];
  timestamp: Date;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchFilters {
  ageRange: [number, number];
  location?: string;
  interests?: string[];
  lookingFor?: string;
  gender?: 'male' | 'female' | 'other';
  isPremium?: boolean;
}