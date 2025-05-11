import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

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

  // Obtener la función saveBookingData del contexto
  const { saveBookingData } = useBooking();

  const handleCheckout = (total, taxes) => {
    // Crear un objeto con los datos de la reserva
    const bookingInfo = {
      formattedDate: selected ? selected.toLocaleDateString() : "No disponible",
      scheduleTime: selectedSchedule ? selectedSchedule.time : "No disponible",
      adults: String(adults),
      children: String(children),
      total: String(total.toFixed(2)),
      taxes: String(taxes.toFixed(2))
    };
    
    // Guardar datos en el contexto
    saveBookingData(bookingInfo);
    console.log('Datos guardados en contexto:', bookingInfo);
    
    // Navegar a la página de checkout
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
