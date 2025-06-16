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
    
    const response = await axios.get(
      `${apiUrl}/user/profile`,
      { headers }
    );
    
    let userData = null;
    
    if (response.data && response.data.data) {
      userData = response.data.data;
    } else if (response.data && response.data.user) {
      userData = response.data.user;
    } else if (response.data && response.data.id) {
      userData = response.data;
    }
    
    if (userData) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      return {
        success: true,
        data: { user: userData },
        message: 'Profile retrieved successfully'
      };
    } else {
      return {
        success: false,
        message: 'Could not parse user profile data',
        data: response.data
      };
    }
    
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch user profile',
      error: error.message,
      data: null
    };
  }
};

