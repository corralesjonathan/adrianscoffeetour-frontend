import axios from 'axios';

/**
 * Service to verify schedule availability
 * Uses the same API configuration as other services
 */

/**
 * Checks if a specific schedule is still available (active status)
 * @param {string} availableDateId - ID of the schedule to verify
 * @returns {Promise<{isAvailable: boolean, message: string}>} - Verification result
 */
export const checkAvailabilityStatus = async (availableDateId) => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const headers = { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' };

  // Verification attempt

  try {
    const response = await axios.get(
      `${apiUrl}/available-dates/active/${availableDateId}`, 
      { headers }
    );

    // Process API response

    // Any successful response means the schedule is available
    // API should return 404 or other error if not available
    return { 
      isAvailable: true, 
      message: 'Schedule is available',
      data: response.data
    };
  } catch (error) {
    // Handle error
    
    // If error is 404, schedule is no longer available
    if (error.response && error.response.status === 404) {
      return { 
        isAvailable: false, 
        message: 'This schedule is no longer available. Please select another time.',
        data: null
      };
    }
    
    // For any other error, show a generic message
    return { 
      isAvailable: false, 
      message: `Error checking availability: ${error.message || 'Unknown error'}`,
      error: error.message
    };
  }
};
