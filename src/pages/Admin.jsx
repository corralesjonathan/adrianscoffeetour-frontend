import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components/admin/Login';
import { login, isLoggedIn, logout } from '../services/authService';
import { getUserProfile } from '../services/profileService';

/**
 * Admin Page Component
 *
 * Main component for the admin panel. Handles authentication and renders
 * either the login screen or the admin dashboard based on authentication status.
 *
 * @component
 */
export const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isLoggedIn();
      setAuthenticated(loggedIn);
      
      if (loggedIn) {
        // Fetch user profile if authenticated
        setProfileLoading(true);
        try {
          const profileResponse = await getUserProfile();
          console.log('Profile response in Admin:', profileResponse);
          
          if (profileResponse.success && profileResponse.data) {
            // Check if we have user data in the expected structure
            const userData = profileResponse.data.user || 
              (profileResponse.data.id || profileResponse.data.email || profileResponse.data.username ? profileResponse.data : null);
              
            if (userData) {
              setUserProfile(userData);
            } else {
              console.error('User data not found in profile response', profileResponse.data);
              setError('Could not load user profile data');
            }
          } else {
            console.error('Error getting user profile:', profileResponse.message);
            setError(profileResponse.message || 'Could not load profile information');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        } finally {
          setProfileLoading(false);
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  /**
   * Handles user logout
   */
  const handleLogout = async () => {
    try {
      setLoading(true);
      const result = await logout();
      if (result.success) {
        setAuthenticated(false);
      } else {
        console.error('Logout failed:', result.message);
        // Still set authenticated to false to force logout on frontend
        setAuthenticated(false);
      }
    } catch (err) {
      console.error('Error during logout:', err);
      // Force logout on frontend even if API call fails
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles login form submission
   * @param {Object} credentials - User credentials
   */
  const handleLogin = async (credentials) => {
    try {
      setError('');
      const response = await login(credentials);
      
      if (response.success) {
        // Si el login es exitoso, actualizamos el estado de autenticación
        setAuthenticated(true);
        
        // Esperamos brevemente para asegurar que el token se haya guardado en localStorage
        // antes de intentar obtener el perfil
        setTimeout(async () => {
          setProfileLoading(true);
          try {
            // Verificamos que el token exista antes de intentar obtener el perfil
            const token = localStorage.getItem('authToken');
            if (!token) {
              console.error('No authentication token found after login');  
              setProfileLoading(false);
              return;
            }
            
            const profileResponse = await getUserProfile();
            
            if (profileResponse.success && profileResponse.data) {
              // Check if we have user data in the expected structure
              const userData = profileResponse.data.user || 
                (profileResponse.data.id || profileResponse.data.email || profileResponse.data.username ? profileResponse.data : null);
                
              if (userData) {
                setUserProfile(userData);
              }
            } else {
              console.error('Error getting user profile after login:', profileResponse.message);
            }
          } catch (err) {
            console.error('Error fetching user profile after login:', err);
          } finally {
            setProfileLoading(false);
          }
        }, 500); // Pequeño retraso para asegurar que el token esté disponible
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error('Login error:', err);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-adrians-red"></div>
      </div>
    );
  }

  // Show admin dashboard if authenticated
  if (authenticated) {
    return (
      <div className="admin-dashboard p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-adrians-red">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-adrians-red text-white rounded-full hover:bg-adrians-red/90 transition-all duration-300"
          >
            Logout
          </button>
        </div>
        
        <div className="admin-content bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-xl font-semibold mb-4">User Profile</h2>
            
            {profileLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-adrians-red"></div>
                <span>Loading profile...</span>
              </div>
            ) : userProfile ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{userProfile.name || userProfile.username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userProfile.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{userProfile.username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{userProfile.role || 'User'}</p>
                </div>
              </div>
            ) : (
              <p>Could not load profile information</p>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <p className="mb-4">Welcome to the admin panel!</p>
            <p>You can manage your coffee tour content here.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  return (
    <Login onSubmit={handleLogin} error={error} />
  );
}
