import axios from 'axios';
import { getAuthToken } from './authService';

/**
 * User Profile Service
 * 
 * Handles operations related to user profile data
 */

/**
 * Fetches the current user profile data from API
 * 
 * @returns {Promise<Object>} User profile data response
 */
export const getUserProfile = async () => {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = getAuthToken();
    
    if (!apiUrl || !token) {
      console.warn('getUserProfile: Missing API URL or token', { apiUrl, hasToken: !!token });
      return {
        success: false,
        message: 'Missing API URL or authentication token',
        data: null
      };
    }
    
    const headers = { 
      'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    console.log('Fetching user profile from API:', `${apiUrl}/user/profile`);
    
    const response = await axios.get(
      `${apiUrl}/user/profile`,
      { headers }
    );
    
    console.log('Profile response:', response.data);
    
    // Basándonos en los logs, la estructura parece ser:
    // { data: { id, email, username, etc. }, success: true }
    let userData = null;
    
    if (response.data && response.data.data) {
      // La API está devolviendo los datos en un objeto 'data'
      userData = response.data.data;
      console.log('Found user data in response.data.data', userData);
    } else if (response.data && response.data.user) {
      userData = response.data.user;
      console.log('Found user data in response.data.user', userData);
    } else if (response.data && response.data.id) {
      // Los datos de usuario están directamente en response.data
      userData = response.data;
      console.log('Found user data directly in response.data', userData);
    }
    
    console.log('Extracted user data:', userData);
    
    if (userData) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return {
        success: true,
        data: { user: userData },
        message: 'Profile retrieved successfully'
      };
    } else {
      console.warn('Could not extract user data from response:', response.data);
      return {
        success: false,
        message: 'Could not parse user profile data',
        data: response.data
      };
    }
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user profile',
      error: error.message,
      data: null
    };
  }
};

