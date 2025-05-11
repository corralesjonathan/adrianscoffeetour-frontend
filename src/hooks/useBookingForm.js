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
  const [selectedDateId, setSelectedDateId] = useState(null); // Para rastrear el ID de la fecha

  useEffect(() => {
    if (tourInfo) {
      setAdults(tourInfo.min_adults || 0);
      setChildren(tourInfo.min_children || 0);
    }
  }, [tourInfo]);

  const handleDateSelect = (date, dateId = null) => {
    setSelected(date);
    setSelectedSchedule(null);
    
    // Si nos pasan explícitamente el ID de la fecha, lo guardamos
    if (dateId) {
      setSelectedDateId(dateId);
    }
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

  const handleCheckout = (total, taxes, dateToIdMap = {}) => {
    // Crear un objeto con los datos de la reserva
    const bookingInfo = {
      formattedDate: selected ? selected.toLocaleDateString() : "No disponible",
      scheduleTime: selectedSchedule ? selectedSchedule.time : "No disponible",
      adults: String(adults),
      children: String(children),
      adultPrice: String(tourInfo?.adult_price || 0),
      childPrice: String(tourInfo?.child_price || 0),
      total: String(total.toFixed(2)),
      taxes: String(taxes.toFixed(2)),
      selectedDateId: selectedDateId // Incluir el ID de la fecha seleccionada
    };
    
    // Intentar obtener el ID basado en la combinación de fecha y horario
    if (selected && selectedSchedule && dateToIdMap) {
      const isoDate = selected.toISOString().split("T")[0];
      const scheduleId = selectedSchedule.id;
      
      // Primero intentamos con la clave combinada (fecha + horario)
      const combinedKey = `${isoDate}|${scheduleId}`;
      
      if (dateToIdMap[combinedKey]) {
        // Si encontramos un ID con la clave combinada, lo usamos
        bookingInfo.selectedDateId = dateToIdMap[combinedKey];
      } else if (dateToIdMap[isoDate]) {
        // Si no, intentamos solo con la fecha
        bookingInfo.selectedDateId = dateToIdMap[isoDate];
      }
    }
    
    // Guardar datos en el contexto
    saveBookingData(bookingInfo);
    console.log('Datos guardados en contexto con ID de fecha:', bookingInfo);
    
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
