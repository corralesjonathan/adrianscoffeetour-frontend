import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch and process booking-related data
 * Retrieves available dates, schedules and tour information
 * 
 * @returns {Object} Booking data including available dates, schedules and tour info
 */
export const useBookingData = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // Data states
  const [data, setData] = useState([]);
  const [tourInfo, setTourInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available dates and tour info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' };
        
        // Fetch both resources in parallel
        const [datesRes, tourRes] = await Promise.all([
          axios.get(`${apiUrl}/available-dates`, { headers }),
          axios.get(`${apiUrl}/adrianscoffeetour`, { headers })
        ]);

        setData(datesRes.data);
        setTourInfo(tourRes.data);
        setError(null);
      } catch (error) {
        setError(error.message || 'Error fetching booking data');
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Process available dates (extract unique dates and convert to Date objects)
  const availableDates = [...new Set(data.map(item => item.date.date))].map(dateStr => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  // Create a map of schedules grouped by date
  const scheduleMapByDate = data.reduce((map, item) => {
    const dateStr = item.date.date;
    if (!map[dateStr]) map[dateStr] = [];
    map[dateStr].push({ id: item.schedule.id, time: item.schedule.schedule });
    return map;
  }, {});

  // Map to get available date ID based on date and schedule time
  const dateToIdMap = data.reduce((map, item) => {
    const dateStr = item.date.date;
    
    // Parse date components
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const isoDate = date.toISOString().split("T")[0];
    
    // Create nested objects for date-schedule mapping
    if (!map[dateStr]) {
      map[dateStr] = {};
    }
    
    // Store ID by schedule time
    map[dateStr][item.schedule.schedule] = item.id;
    
    // Also store a version with just the date for when schedule is not available
    if (!map[isoDate]) {
      map[isoDate] = item.id;
    }
    
    return map;
  }, {});

  return {
    tourInfo,
    availableDates,
    scheduleMapByDate,
    dateToIdMap,
    loading,
    error
  };
};
