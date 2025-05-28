import { useState } from 'react';

/**
 * Custom hook for booking form validation
 * Provides error states and validation functions
 * 
 * @returns {Object} Validation states and functions
 */
export const useBookingValidation = () => {
  const [dateError, setDateError] = useState("");
  const [scheduleError, setScheduleError] = useState("");

  /**
   * Validate booking form data
   * 
   * @param {Object} params - Booking parameters
   * @param {Date} params.selected - Selected date
   * @param {Object} params.selectedSchedule - Selected schedule
   * @returns {boolean} Whether the booking data is valid
   */
  const validateBooking = ({ selected, selectedSchedule }) => {
    let isValid = true;
    
    if (!selected) {
      setDateError("Please select a date for the tour");
      isValid = false;
    } else {
      setDateError("");
    }
    
    if (!selectedSchedule) {
      setScheduleError("Please select a schedule for the tour");
      isValid = false;
    } else {
      setScheduleError("");
    }

    return isValid;
  };

  /**
   * Clear all validation errors
   */
  const clearErrors = () => {
    setDateError("");
    setScheduleError("");
  };

  return {
    dateError,
    scheduleError,
    validateBooking,
    clearErrors
  };
};
