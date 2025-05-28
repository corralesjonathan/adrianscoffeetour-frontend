import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBookingData = () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  // Data States
  const [data, setData] = useState([]);
  const [tourInfo, setTourInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch available dates and tour info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' };
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

  // Process available dates
  const availableDates = [...new Set(data.map(item => item.date.date))].map(dateStr => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  // Process schedules by date
  const scheduleMapByDate = data.reduce((map, item) => {
    const dateStr = item.date.date;
    if (!map[dateStr]) map[dateStr] = [];
    map[dateStr].push({ id: item.schedule.id, time: item.schedule.schedule });
    return map;
  }, {});

  // Mapa para obtener el ID del objeto padre disponible basado en la fecha y el horario
  const dateToIdMap = data.reduce((map, item) => {
    const dateStr = item.date.date;
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const isoDate = date.toISOString().split("T")[0];
    const scheduleId = item.schedule.id;
    
    // La clave será una combinación de la fecha ISO y el ID del horario
    const key = `${isoDate}|${scheduleId}`;
    
    // Guardar el ID del objeto padre (el registro completo available-date)
    map[key] = item.id;
    
    // También guardamos una versión solo con la fecha para buscar por fecha cuando no tenemos horario
    if (!map[isoDate]) {
      map[isoDate] = item.id;
    }
    
    return map;
  }, {});

  return {
    tourInfo,
    availableDates,
    scheduleMapByDate,
    dateToIdMap, // Añadimos el mapa para buscar IDs de fechas
    rawData: data, // Exponemos los datos originales por si se necesitan
    loading,
    error
  };
};
