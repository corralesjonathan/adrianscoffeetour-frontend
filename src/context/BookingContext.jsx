import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const BookingContext = createContext();

// Context provider that will hold the global state
export function BookingProvider({ children }) {
  // State to store booking data
  const [bookingData, setBookingData] = useState(null);

  // Load data from localStorage on initialization
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('bookingData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setBookingData(parsedData);
        // Data loaded from localStorage
      }
    } catch (error) {
      // Error handling for localStorage loading
    }
  }, []);

  // Function to save booking data
  const saveBookingData = (data) => {
    // Saving data to context
    setBookingData(data);
    
    // Also save to localStorage as backup
    try {
      localStorage.setItem('bookingData', JSON.stringify(data));
    } catch (error) {
      // Error handling for localStorage saving
    }
  };

  // Expose context values and functions
  const value = {
    bookingData,
    saveBookingData,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook to access the context
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
