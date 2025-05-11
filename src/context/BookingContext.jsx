import { createContext, useState, useContext } from 'react';

// Crear el contexto
export const BookingContext = createContext();

// Proveedor del contexto que contendrá el estado global
export function BookingProvider({ children }) {
  // Estado para almacenar los datos de la reserva
  const [bookingData, setBookingData] = useState(null);

  // Función para guardar los datos de la reserva
  const saveBookingData = (data) => {
    console.log('Guardando datos en contexto:', data);
    setBookingData(data);
    
    // También guardar en localStorage como respaldo
    try {
      localStorage.setItem('bookingData', JSON.stringify(data));
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
    }
  };

  // Exponer los valores y funciones del contexto
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

// Hook personalizado para acceder al contexto
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking debe usarse dentro de un BookingProvider');
  }
  return context;
}
