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
    // Create booking info object
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
      selectedDateId: selectedDateId // Include the selected date ID
    };
    
    // Try to get ID based on date and schedule combination
    if (selected && selectedSchedule && dateToIdMap) {
      const isoDate = selected.toISOString().split("T")[0];
      const scheduleId = selectedSchedule.id;
      
      // First try with combined key (date + schedule)
      const combinedKey = `${isoDate}|${scheduleId}`;
      
      if (dateToIdMap[combinedKey]) {
        // If we find an ID with the combined key, use it
        bookingInfo.selectedDateId = dateToIdMap[combinedKey];
      } else if (dateToIdMap[isoDate]) {
        // Otherwise, try with just the date
        bookingInfo.selectedDateId = dateToIdMap[isoDate];
      }
    }
    
    // Save data in context
    saveBookingData(bookingInfo);
    console.log('Data saved in context with date ID:', bookingInfo);
    
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
