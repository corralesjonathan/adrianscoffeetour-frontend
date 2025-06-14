import { useState } from 'react';
import { checkAvailabilityStatus } from '../services/availabilityService';

/**
 * Custom hook for checking availability of a tour schedule
 * 
 * Handles the verification process, loading states, and error messages
 */
export function useAvailabilityCheck() {
  // States for the availability checking process
  const [isChecking, setIsChecking] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  /**
   * Verifies availability of a selected schedule
   * 
   * @param {string|number|Object} selectedDateId - The ID of the date/schedule to verify
   * @param {string} scheduleTime - The selected schedule time
   * @returns {Promise<boolean>} True if the schedule is available, false otherwise
   */
  const verifyAvailability = async (bookingData) => {
    if (!bookingData) {
      setErrorMessage("No booking data found");
      setHasError(true);
      return false;
    }
    
    // Determine the correct ID to use
    let availabilityId = null;
    
    if (typeof bookingData.selectedDateId === 'object' && bookingData.selectedDateId !== null) {
      // If it's an object, try to get the ID based on selected schedule time
      if (bookingData.scheduleTime && bookingData.selectedDateId[bookingData.scheduleTime]) {
        availabilityId = bookingData.selectedDateId[bookingData.scheduleTime];
      } else {
        // If we can't find by schedule time, use the first available ID
        const firstKey = Object.keys(bookingData.selectedDateId)[0];
        if (firstKey) {
          availabilityId = bookingData.selectedDateId[firstKey];
        }
      }
    } else if (bookingData.selectedDateId) {
      // If it's already a simple value (string or number), use it directly
      availabilityId = bookingData.selectedDateId;
    }
    
    if (!availabilityId) {
      setErrorMessage("Missing availability ID");
      setHasError(true);
      return false;
    }
    
    // Show loading modal and set checking state
    setIsChecking(true);
    setShowLoadingModal(true);
    
    try {
      const result = await checkAvailabilityStatus(availabilityId);
      
      if (!result.isAvailable) {
        setErrorMessage(result.message);
        setHasError(true);
        return false;
      }
      
      return true;
    } catch (error) {
      setErrorMessage("Failed to verify schedule availability. Please try again.");
      setHasError(true);
      return false;
    } finally {
      // Hide loading modal and reset state
      setIsChecking(false);
      setShowLoadingModal(false);
    }
  };
  
  /**
   * Clears any existing error state
   */
  const clearError = () => {
    setHasError(false);
    setErrorMessage('');
  };

  return {
    verifyAvailability,
    isChecking,
    showLoadingModal,
    hasError,
    errorMessage,
    clearError
  };
}
