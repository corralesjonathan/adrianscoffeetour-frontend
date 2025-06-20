import axios from 'axios';

// Configuración del interceptor para manejar errores 401
axios.interceptors.response.use(
  response => response,
  error => {
    // Si recibimos error 401 Unauthorized, podría ser debido a un token expirado
    if (error.response && error.response.status === 401) {
      // Disparar un evento para que los componentes puedan reaccionar
      // (ej. mostrar el modal de sesión expirada)
      const event = new CustomEvent('session-expired');
      window.dispatchEvent(event);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Authentication Service
 * 
 * Handles login, logout, and authentication state management
 */

/**
 * Attempts to log in a user with provided credentials
 * 
 * @param {Object} credentials - User login credentials (email/username and password)
 * @returns {Promise<Object>} Authentication response with token and user data
 */
export const login = async (credentials) => {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    
    // Ensure we have the API URL
    if (!apiUrl) {
      console.error("Missing API URL environment variable");
      return {
        success: false,
        message: 'Missing API configuration',
        error: 'VITE_APP_API_URL environment variable is not defined'
      };
    }
    
    const headers = { 
      'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e',
      'Content-Type': 'application/json'
    };
    
    // The API accepts both email and username, so we'll preserve the exact field names
    // that the user entered
    const requestBody = {
      ...credentials
    };
    
    console.log("Sending login request to API:", `${apiUrl}/auth/login`);
    console.log("Request body:", JSON.stringify(requestBody));
    
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      requestBody,
      { headers }
    );
    
    console.log("Login successful");

    console.log("Response data:", response.data.access_token);
    
    // Store auth token in localStorage for future API calls
    if (response.data && response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user || {}));
    }
    
    return {
      success: true,
      data: response.data,
      message: 'Login successful'
    };
    
  } catch (error) {
    console.error('Login failed:', error);
    console.error('Error details:', error.response?.data || {});
    
    return {
      success: false,
      message: error.response?.data?.message || 'Invalid credentials',
      error: error.message
    };
  }
};

/**
 * Logs out the current user by calling the logout API endpoint
 * and removing auth data from storage
 * 
 * @returns {Promise<Object>} Logout status
 */
export const logout = async () => {
  try {
    const apiUrl = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem('authToken');
    
    // Ensure we have the API URL and token
    if (!apiUrl) {
      throw new Error('Missing API URL environment variable');
    }
    
    if (!token) {
      // If no token, just clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }
    
    const headers = { 
      'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // Call logout API endpoint
    await axios.post(
      `${apiUrl}/auth/logout`,
      {}, // Empty body
      { headers }
    );
    
    // Clear local storage whether API call succeeds or fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch (error) {
    console.error('Error during logout:', error);
    
    // Even if API call fails, clear local storage to ensure user is logged out on frontend
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    return {
      success: false,
      message: 'Error during logout, but session was cleared locally',
      error: error.message
    };
  }
};

/**
 * Verifica si el token JWT ha expirado
 * 
 * @returns {boolean} True si el token ha expirado
 */
export const isTokenExpired = () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) return true;
  
  try {
    // Obtener la parte de payload del token (segunda parte)
    const payload = token.split('.')[1];
    // Decodificar el payload base64
    const decodedPayload = JSON.parse(atob(payload));
    // El campo exp del JWT contiene el timestamp de expiración en segundos
    const expTime = decodedPayload.exp * 1000; // Convertir a milisegundos
    
    // Comparar con la hora actual
    return Date.now() >= expTime;
  } catch (error) {
    // Si hay algún error al decodificar, asumir que el token es inválido
    return true;
  }
};

/**
 * Checks if the user is currently logged in
 * 
 * @returns {boolean} True if user is logged in
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  
  // Si el token ha expirado, cerrar sesión automáticamente
  if (isTokenExpired()) {
    // No eliminamos el token aquí para permitir que la app muestre el modal de expiración
    return false;
  }
  
  return true;
};

/**
 * Gets the current authenticated user data from local storage
 * 
 * @returns {Object|null} User data or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting current user from storage:', error);
    return null;
  }
};

/**
 * Gets the authentication token for API requests
 * 
 * @returns {string|null} Auth token or null if not logged in
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
