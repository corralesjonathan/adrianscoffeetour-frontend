import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

/**
 * Custom hook for managing booking form state and actions
 * 
 * @param {Object} tourInfo - Tour information including pricing and restrictions
 * @returns {Object} Form state and action handlers
 */
export const useBookingForm = (tourInfo) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState(null); // Track the selected date ID

  // Initialize with minimum required people
  useEffect(() => {
    if (tourInfo) {
      setAdults(tourInfo.min_adults || 0);
      setChildren(tourInfo.min_children || 0);
    }
  }, [tourInfo]);

  /**
   * Handle date selection and reset schedule
   */
  const handleDateSelect = (date, dateId = null) => {
    setSelected(date);
    setSelectedSchedule(null);
    
    // If a date ID is explicitly provided, store it
    if (dateId) {
      setSelectedDateId(dateId);
    }
  };

  /**
   * Handle schedule selection and close dropdown
   */
  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenSchedule(false);
  };

  /**
   * Increment adult count if below maximum people
   */
  const handleIncrementAdults = () => {
    if (adults + children < tourInfo.max_people) {
      setAdults(prev => prev + 1);
    }
  };

  /**
   * Decrement adult count if above minimum required
   */
  const handleDecrementAdults = () => {
    if (adults > tourInfo.min_adults) {
      setAdults(prev => prev - 1);
    }
  };

  /**
   * Increment children count if below maximum people
   */
  const handleIncrementChildren = () => {
    if (adults + children < tourInfo.max_people) {
      setChildren(prev => prev + 1);
    }
  };

  /**
   * Decrement children count if above minimum required
   */
  const handleDecrementChildren = () => {
    if (children > tourInfo.min_children) {
      setChildren(prev => prev - 1);
    }
  };

  // Get saveBookingData function from context
  const { saveBookingData } = useBooking();

  /**
   * Process checkout with booking information
   * 
   * @param {number} total - Total booking amount
   * @param {number} taxes - Tax amount
   * @param {Object} dateToIdMap - Map of dates to available date IDs
   */
  const handleCheckout = (total, taxes, dateToIdMap = {}) => {
    // Variable to store the correct ID
    let availableDateId = null;
    
    // Expected format of dateToIdMap:
    // dateToIdMap = {
    //   "2025-05-28": {
    //     "09:00 AM to 11:00 AM": 57,
    //     "01:00 PM to 03:30 PM": 58
    //   }
    // }
    
    // Debug information for dateToIdMap
    
    if (selected && selectedSchedule) {
      // Get date in ISO format
      const dateIso = selected.toISOString().split('T')[0]; // format 2025-05-28
      
      // Get date in YYYY-MM-DD format used by the API
      const month = (selected.getMonth() + 1).toString().padStart(2, '0');
      const day = selected.getDate().toString().padStart(2, '0');
      const year = selected.getFullYear();
      const dateFormatted = `${year}-${month}-${day}`;
      
      // Get the selected schedule time
      const scheduleTime = selectedSchedule.time;
      
      // Selected date and schedule information
      
      // Intentar obtener el ID directamente
      if (dateToIdMap[dateFormatted] && 
          typeof dateToIdMap[dateFormatted] === 'object' && 
          dateToIdMap[dateFormatted][scheduleTime]) {
        
        // Extract the specific ID for this schedule
        availableDateId = dateToIdMap[dateFormatted][scheduleTime];
        // ID found for schedule
      }
      // If not found, try with the ISO date
      else if (dateToIdMap[dateIso]) {
        availableDateId = dateToIdMap[dateIso];
        // ID found for ISO date
      }
    }
    
    // If still no ID, check if selectedDateId already exists
    if (!availableDateId && selectedDateId) {
      availableDateId = selectedDateId;
      // Using previously selected ID
    }
    
    // If still no ID, use default value or show error message
    if (!availableDateId) {
      // No availability ID found
    }
    
    // Create object with booking information
    const bookingInfo = {
      formattedDate: selected ? selected.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) : "Not available",
      scheduleTime: selectedSchedule ? selectedSchedule.time : "Not available",
      adults: String(adults),
      children: String(children),
      adultPrice: String(tourInfo?.adult_price || 0),
      childPrice: String(tourInfo?.child_price || 0),
      total: String(total.toFixed(2)),
      taxes: String(taxes.toFixed(2)),
      selectedDateId: availableDateId // Save ONLY the ID as a unique value (number)
    };
    
    // Log to verify the ID is correct
    // Booking info metadata
    
    // Save data in context
    saveBookingData(bookingInfo);
    // Data saved in context
    
    // Navigate to checkout page
    navigate('/checkout');
  };

  return {
    formState: {
      selected,
      showCalendar,
      selectedSchedule,
      openSchedule,
      adults,
      children,
      showSummary,
      selectedDateId
    },
    /**
     * Action handlers
     */
    actions: {
      setSelected,
      setShowCalendar,
      setSelectedSchedule,
      setOpenSchedule,
      handleDateSelect,
      handleScheduleSelect,
      handleIncrementAdults,
      handleDecrementAdults,
      handleIncrementChildren,
      handleDecrementChildren,
      setShowSummary,
      handleCheckout
    }
  };
};
