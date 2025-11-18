import { create } from 'zustand';
import authService, { AdminUser, LoginCredentials } from '../services/authService';

interface AuthState {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  verifyAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      set({ 
        admin: response.admin,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    set({ 
      admin: null,
      isAuthenticated: false,
      error: null
    });
  },

  verifyAuth: async () => {
    if (!authService.isAuthenticated()) {
      return;
    }

    set({ isLoading: true });
    
    try {
      const response = await authService.verifyToken();
      set({ 
        admin: response.admin,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      authService.logout();
      set({ 
        admin: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));