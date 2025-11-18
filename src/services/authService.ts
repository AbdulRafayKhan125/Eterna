import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  admin: AdminUser;
}

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('adminToken');
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, admin } = response.data;
      
      this.token = token;
      localStorage.setItem('adminToken', token);
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyToken(): Promise<{ success: boolean; admin: AdminUser }> {
    if (!this.token) {
      throw new Error('No token found');
    }

    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
      
      return response.data;
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('adminToken');
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    return new Error('An error occurred during authentication');
  }
}

export default new AuthService();