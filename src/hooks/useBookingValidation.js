import { useState } from 'react';

export const useBookingValidation = () => {
  const [dateError, setDateError] = useState("");
  const [scheduleError, setScheduleError] = useState("");

  const validateBooking = ({ selected, selectedSchedule }) => {
    let isValid = true;
    
    if (!selected) {
      setDateError("Por favor selecciona una fecha para el tour");
      isValid = false;
    } else {
      setDateError("");
    }
    
    if (!selectedSchedule) {
      setScheduleError("Por favor selecciona un horario para el tour");
      isValid = false;
    } else {
      setScheduleError("");
    }

    return isValid;
  };

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
