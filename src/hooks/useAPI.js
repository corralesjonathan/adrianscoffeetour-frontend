import { useState } from "react";
import axios from "axios";

const useAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // configurate axios with base url
  const apiClient = axios.create({
    baseURL: "http://adrianscoffeetour.test/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const apiRequest = async (method, endpoint, payload = null, params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient({
        method,
        url: endpoint,
        data: payload,
        params,
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = (endpoint, params) => apiRequest("get", endpoint, null, params);
  const post = (endpoint, payload) => apiRequest("post", endpoint, payload);
  const put = (endpoint, payload) => apiRequest("put", endpoint, payload);
  const del = (endpoint) => apiRequest("delete", endpoint);

  return { data, error, loading, get, post, put, del };
};

export default useAPI;
