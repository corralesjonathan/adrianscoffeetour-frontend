import { useState, useCallback } from "react";
import api from "./axiosInstance"; // Importa la instancia global de Axios

export function useAxios() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (endpoint, options = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api({
          url: endpoint, // Solo pasas el endpoint
          method: options.method || "GET",
          data: options.body, // Axios usa `data` en lugar de `body`
          headers: options.headers,
        });
        setData(response.data);
        return response.data; // Devuelve los datos para manejar el resultado
      } catch (err) {
        setError(err);
        console.error(err);
        return null; // Devuelve null en caso de error
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, request };
}
