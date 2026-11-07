import axios from '../utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';

const authService = {
  login: async (username, password, role) => {
    const response = await axios.post('/auth/login', {
      username,
      password,
      role,
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

  signup: async (userData) => {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  },
};

export default authService;