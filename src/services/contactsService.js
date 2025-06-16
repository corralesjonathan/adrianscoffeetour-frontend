import axios from 'axios';
import { getAuthToken } from './authService';

/**
 * Contacts Service
 * 
 * Handles operations related to contact data
 */

/**
 * Fetches contacts data from API
 * 
 * @returns {Promise<Object>} Contacts data response
 */
export const getContacts = async () => {
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
      `${apiUrl}/contacts`,
      { headers }
    );
    
    if (response.data) {
      return {
        success: true,
        data: response.data,
        message: 'Contacts retrieved successfully'
      };
    } else {
      return {
        success: false,
        message: 'Could not parse contacts data',
        data: null
      };
    }
    
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch contacts',
      error: error.message,
      data: null
    };
  }
};
