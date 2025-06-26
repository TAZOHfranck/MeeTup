import { useState, useEffect } from 'react';
import { AuthState, User } from '../types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Mock user data for demonstration
  const mockUser: User = {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    bio: 'Love traveling, reading, and exploring new cultures. Looking for someone genuine and kind.',
    location: 'Lagos, Nigeria',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=500',
    ],
    isPremium: true,
    isOnline: true,
    interests: ['Travel', 'Reading', 'Cooking', 'Photography'],
    lookingFor: 'Serious relationship',
    gender: 'female',
    occupation: 'Marketing Manager',
    education: 'University Graduate',
  };

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setAuthState({
        user: isLoggedIn ? mockUser : null,
        isAuthenticated: isLoggedIn,
        isLoading: false,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = (email: string, password: string) => {
    // Mock login
    localStorage.setItem('isLoggedIn', 'true');
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const register = (userData: Partial<User>) => {
    // Mock registration
    localStorage.setItem('isLoggedIn', 'true');
    setAuthState({
      user: { ...mockUser, ...userData },
      isAuthenticated: true,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
    register,
  };
};