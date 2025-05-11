import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useBookingForm = (tourInfo) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (tourInfo) {
      setAdults(tourInfo.min_adults || 0);
      setChildren(tourInfo.min_children || 0);
    }
  }, [tourInfo]);

  const handleDateSelect = (date) => {
    setSelected(date);
    setSelectedSchedule(null);
  };

  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenSchedule(false);
  };

  const handleIncrementAdults = () => {
    if (adults + children < tourInfo.max_people) {
      setAdults(prev => prev + 1);
    }
  };

  const handleDecrementAdults = () => {
    if (adults > tourInfo.min_adults) {
      setAdults(prev => prev - 1);
    }
  };

  const handleIncrementChildren = () => {
    if (adults + children < tourInfo.max_people) {
      setChildren(prev => prev + 1);
    }
  };

  const handleDecrementChildren = () => {
    if (children > tourInfo.min_children) {
      setChildren(prev => prev - 1);
    }
  };

  const handleCheckout = (total, taxes) => {
    const bookingData = {
      date: selected,
      schedule: selectedSchedule,
      adults,
      children,
      total,
      taxes
    };
    
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
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
      showSummary
    },
    actions: {
      setSelected,
      setShowCalendar,
      setSelectedSchedule,
      setOpenSchedule,
      setShowSummary,
      handleDateSelect,
      handleScheduleSelect,
      handleIncrementAdults,
      handleDecrementAdults,
      handleIncrementChildren,
      handleDecrementChildren,
      handleCheckout
    }
  };
};
