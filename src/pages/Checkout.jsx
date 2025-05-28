import { Navbar } from "../components/shared/Navbar.jsx";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalConfig from "../config/paypalConfig.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  getAllCountries,
  getAllCountryCodes,
  getStatesByCountry, 
  getGenericState,
  defaultCountry,
  defaultCountryCode
} from "../services/countryService.js";

export function Checkout() {
  const navigate = useNavigate();
  // Obtener los datos directamente del contexto
  const { bookingData } = useBooking();
  
  // Configuración de PayPal
  const [paypalError, setPaypalError] = useState(null);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Estado para el temporizador de 10 minutos (600 segundos)
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutos en segundos
  const timerRef = useRef(null);
  
  // Estado para validar el formulario y controlar la visibilidad de la sección de pago
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Estados para los datos del formulario para enviar a PayPal
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  // Opciones iniciales de PayPal
  const initialOptions = {
    "client-id": paypalConfig[paypalConfig.environment].clientId,
    currency: "USD",
    intent: "capture"
  };
  
  // Estados para el selector de código de país (teléfono)
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  // Estados para el selector de país (ISO Alpha-2)
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [filteredCountriesList, setFilteredCountriesList] = useState([]);
  
  // Estados para el selector de estado/provincia
  const [selectedState, setSelectedState] = useState("");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const [availableStates, setAvailableStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  // Efecto para cargar datos iniciales
  useEffect(() => {
    // Inicializar los selectores con sus valores por defecto
    const allCountryCodes = getAllCountryCodes();
    const allCountries = getAllCountries();
    setFilteredCountries(allCountryCodes);
    setFilteredCountriesList(allCountries);
  }, []);

  // Efecto para cargar estados/provincias cuando cambia el país seleccionado
  useEffect(() => {
    if (selectedCountry) {
      const states = getStatesByCountry(selectedCountry);
      setAvailableStates(states);
      setFilteredStates(states);
      
      // Resetear el estado seleccionado
      if (states.length > 0) {
        setSelectedState(states[0].code);
      } else {
        const genericState = getGenericState(selectedCountry);
        setSelectedState(genericState.code);
      }
    }
  }, [selectedCountry]);
  
  // Efecto para filtrar estados cuando se busca
  useEffect(() => {
    if (stateSearchQuery) {
      const filtered = availableStates.filter(state => 
        state.name.toLowerCase().includes(stateSearchQuery.toLowerCase()) ||
        state.code.toLowerCase().includes(stateSearchQuery.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates(availableStates);
    }
  }, [stateSearchQuery, availableStates]);

  // Efecto para filtrar países cuando se busca
  useEffect(() => {
    const allCountries = getAllCountries();
    const filtered = allCountries.filter(country =>
      country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
    );
    setFilteredCountriesList(filtered);
  }, [countrySearchQuery]);

  useEffect(() => {
    document.title = "Checkout - Adrian's Coffee Tour";
    
    // If there is no data in the context, redirect to home
    if (!bookingData) {
      console.error("No booking data found in context");
      navigate('/');
    }
    
    // Prevent accidental page reload or navigation
    window.onbeforeunload = () => "Are you sure you want to leave? Your booking information may be lost.";
    
    // Clean up the event before unmounting
    return () => {
      window.onbeforeunload = null;
    };
  }, [bookingData, navigate]);
  
  // Efecto para gestionar el temporizador de 10 minutos
  useEffect(() => {
    // Iniciar el temporizador solo si no está completada la orden
    if (!orderCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Cuando el tiempo llega a cero, limpiar el intervalo y redirigir al inicio
            clearInterval(timerRef.current);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    // Limpiar el temporizador cuando el componente se desmonta o la orden se completa
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [navigate, orderCompleted]);
  
  // Función para verificar si el formulario está completo
  const validateForm = () => {
    // Validar que todos los campos obligatorios estén completos
    const isFormComplete = 
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      address.trim() !== '' &&
      city.trim() !== '' &&
      zipCode.trim() !== '' &&
      selectedCountry !== '' &&
      selectedState !== '';
    
    setFormIsValid(isFormComplete);
    return isFormComplete;
  };
  
  // Función para manejar el envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validar el formulario
    const isValid = validateForm();
    
    if (isValid) {
      // Si el formulario es válido, mostrar la sección de pago
      setShowPaymentSection(true);
      setFormError("");
      // Scrollear hacia abajo para que se vea la sección de pago
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      // Si no es válido, mostrar mensaje de error
      setShowPaymentSection(false);
      setFormError("Please complete all the billing information fields");
    }
  };

  // Si no hay datos, mostrar una pantalla de carga
  if (!bookingData) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-adrians-red"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="
        flex flex-col justify-center items-center gap-[40px] 
        w-[80vw] m-auto py-[40px] min-h-screen mt-[20px]
        max-xl:w-[90vw] max-lg:mt-[60px]
      ">
        <h1 className="text-3xl font-bold text-adrians-red text-center">Checkout</h1>
        
        {/* Temporizador */}
        <div className="w-full bg-gray-100 p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-adrians-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">
              Tiempo restante para completar la reserva: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <div className="w-full bg-gray-300 h-2 mt-2 rounded-full overflow-hidden">
            <div 
              className="bg-adrians-red h-full transition-all duration-1000 ease-linear" 
              style={{ width: `${(timeRemaining / 600) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-[60px] w-full
          max-lg:gap-[40px] 
        ">
          {/* Columna izquierda - Billing Information */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <h2 className="text-xl font-semibold text-adrians-red mb-6">Billing Information</h2>
            
            {formError && (
              <div className="p-4 mb-4 bg-red-50 rounded-[15px] text-red-700">
                <p className="font-medium">Error</p>
                <p className="text-sm">{formError}</p>
              </div>
            )}
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-adrians-brown mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-adrians-brown mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-adrians-brown mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-adrians-brown mb-1">Phone</label>
                <div className="relative flex items-center">
                  {/* Selector de código de país */}
                  <div className="relative w-[30%] mr-2">
                    <div 
                      onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                      className="flex items-center justify-between p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {selectedCountryCode.code}
                      </span>
                      <svg 
                        className={`w-4 h-4 ml-2 text-adrians-red transition-transform duration-200 ${isCountryCodeOpen ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Dropdown para los códigos de país */}
                    {isCountryCodeOpen && (
                      <div className="absolute z-10 w-[300px] mt-1 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-2 border-b border-adrians-brown/10">
                          <input 
                            type="text" 
                            placeholder="Search country..."
                            className="w-full p-2 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-1 focus:ring-adrians-red focus:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const query = e.target.value.toLowerCase();
                              setSearchQuery(query);
                              const allCountryCodes = getAllCountryCodes();
                              const filtered = allCountryCodes.filter(country => 
                                country.country.toLowerCase().includes(query) || 
                                country.code.toLowerCase().includes(query)
                              );
                              setFilteredCountries(filtered);
                            }}
                            value={searchQuery}
                          />
                        </div>
                        {(searchQuery ? filteredCountries : getAllCountryCodes()).map((country, index) => (
                          <div
                            key={`${country.code}-${index}`}
                            onClick={() => {
                              setSelectedCountryCode(country);
                              setIsCountryCodeOpen(false);
                              setSearchQuery(""); // Limpiar la búsqueda al seleccionar
                              setFilteredCountries(getAllCountryCodes());
                              
                              // Actualizar automáticamente el país seleccionado
                              if (country.flag) {
                                setSelectedCountry(country.flag.toUpperCase());
                              }
                            }}
                            className="flex items-center p-2 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
                          >
                            <span className="mr-2 text-gray-700">{country.country}</span>
                            <span className="text-xs text-gray-500">{country.code}</span>
                          </div>
                        ))}
                        {searchQuery && filteredCountries.length === 0 && (
                          <div className="p-3 text-center text-gray-500">
                            No countries found matching "{searchQuery}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Input para el número de teléfono */}
                  <input 
                    type="tel" 
                    id="phone"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                    placeholder="123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-adrians-brown mb-1">Country</label>
                <div className="relative w-full">
                  <div 
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="flex items-center justify-between p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300 cursor-pointer"
                  >
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {selectedCountry && getAllCountries().find(c => c.code === selectedCountry)?.name || defaultCountry}
                    </span>
                    <svg 
                      className={`w-4 h-4 ml-2 text-adrians-red transition-transform duration-200 ${isCountryDropdownOpen ? "rotate-180" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {isCountryDropdownOpen && (
                    <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto">
                      <div className="sticky top-0 bg-white p-2 border-b border-adrians-brown/10">
                        <input 
                          type="text" 
                          placeholder="Search country..."
                          className="w-full p-2 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-1 focus:ring-adrians-red focus:border-transparent"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            setCountrySearchQuery(e.target.value.toLowerCase());
                            const allCountries = getAllCountries();
                            const filtered = allCountries.filter(country => 
                              country.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
                              country.code.toLowerCase().includes(e.target.value.toLowerCase())
                            );
                            setFilteredCountriesList(filtered);
                          }}
                          value={countrySearchQuery}
                        />
                      </div>
                      {filteredCountriesList.map((country) => (
                        <div
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country.code);
                            setIsCountryDropdownOpen(false);
                            setCountrySearchQuery("");
                            setFilteredCountriesList(getAllCountries());
                          }}
                          className="p-3 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
                        >
                          <span className="text-gray-700">{country.name}</span>
                          <span className="ml-2 text-xs text-gray-500">{country.code}</span>
                        </div>
                      ))}
                      {countrySearchQuery && filteredCountriesList.length === 0 && (
                        <div className="p-3 text-center text-gray-500">
                          No countries found matching "{countrySearchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                  <input 
                    type="hidden" 
                    id="country"
                    name="country"
                    value={selectedCountry}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-adrians-brown mb-1">City</label>
                  <input 
                    type="text" 
                    id="city"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-adrians-brown mb-1">State / Province</label>
                  <div className="relative">
                    <div 
                      onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                      className="w-full p-3 border border-adrians-brown/30 rounded-full flex justify-between items-center cursor-pointer hover:border-adrians-red transition-all duration-300"
                    >
                      <span className="text-adrians-brown overflow-hidden text-ellipsis">
                        {availableStates.find(s => s.code === selectedState)?.name || 
                         getGenericState(selectedCountry).name}
                      </span>
                      <svg 
                        className={`w-4 h-4 ml-2 text-adrians-red transition-transform duration-200 ${isStateDropdownOpen ? "rotate-180" : ""}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {isStateDropdownOpen && (
                      <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto">
                        {availableStates.length > 0 ? (
                          <>
                            <div className="sticky top-0 bg-white p-2 border-b border-adrians-brown/10">
                              <input 
                                type="text" 
                                placeholder="Search state/province..."
                                className="w-full p-2 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-1 focus:ring-adrians-red focus:border-transparent"
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  const query = e.target.value.toLowerCase();
                                  setStateSearchQuery(query);
                                }}
                                value={stateSearchQuery}
                              />
                            </div>
                            {filteredStates.map((state) => (
                              <div
                                key={state.code}
                                onClick={() => {
                                  setSelectedState(state.code);
                                  setIsStateDropdownOpen(false);
                                  setStateSearchQuery("");
                                }}
                                className="p-3 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
                              >
                                <span className="text-gray-700">{state.name}</span>
                                <span className="ml-2 text-xs text-gray-500">{state.code}</span>
                              </div>
                            ))}
                            {stateSearchQuery && filteredStates.length === 0 && (
                              <div className="p-3 text-center text-gray-500">
                                No states/provinces found matching "{stateSearchQuery}"
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="p-3 text-center text-gray-500">
                            No states/provinces available for this country
                          </div>
                        )}
                      </div>
                    )}
                    <input 
                      type="hidden" 
                      id="state"
                      name="state"
                      value={selectedState}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-adrians-brown mb-1">Postal / Zip Code</label>
                  <input 
                    type="text" 
                    id="zipCode"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-adrians-brown mb-1">Address</label>
                <input 
                  type="text" 
                  id="address"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit"
                  className="group cursor-pointer shadow-adrians-btn-shadow hover:shadow-adrians-btn-shadow-hover hover:scale-105 transition-all duration-300 ease-in-out w-full py-3 px-6 bg-adrians-red text-white rounded-full hover:bg-adrians-red/90 transition-all duration-300 font-medium flex items-center justify-center"
                >
                  Continue to Payment
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:translate-x-[5px] transition-all duration-300 ease-in-out" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          {/* Columna derecha - Booking Details */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <div>
              <h2 className="text-xl font-semibold text-adrians-red mb-6">Booking Details</h2>
              
              <div className="bg-adrians-red/5 rounded-[15px] p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-adrians-brown mb-2">
                      <span className="font-medium">Date:</span> {bookingData.formattedDate || "Not available"}
                    </p>
                    <p className="text-adrians-brown mb-2">
                      <span className="font-medium">Schedule:</span> {bookingData.scheduleTime || "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-adrians-brown mb-2">
                      <span className="font-medium">Adults:</span> {bookingData.adults || "0"}x${bookingData.adultPrice || "0"}
                    </p>
                    {parseInt(bookingData.children) > 0 && (
                      <p className="text-adrians-brown mb-2">
                        <span className="font-medium">Children:</span> {bookingData.children}x${bookingData.childPrice || "0"}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-adrians-red/20 mt-4 pt-4">
                  <p className="text-adrians-brown mb-1">
                    <span className="font-medium">Taxes:</span> ${bookingData.taxes || "0.00"}
                  </p>
                  <p className="text-xl font-semibold text-adrians-red">
                    <span className="font-bold">Total:</span> ${bookingData.total || "0.00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Sección de pago (condicionalmente renderizada) */}
            <AnimatePresence>
              {showPaymentSection && (
                <motion.div 
                  className="mt-6 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15
                  }}
                >
                  <h3 className="text-lg font-semibold text-adrians-red mb-4">Payment Method</h3>
                  
                  {orderCompleted ? (
                  <div className="p-4 bg-green-50 rounded-[15px] text-green-700">
                    <p className="font-medium">Payment Completed!</p>
                    <p className="text-sm">Thank you for your booking. You will receive a confirmation email shortly.</p>
                  </div>
                ) : (
                  <>
                    {paypalError && (
                      <div className="p-4 mb-4 bg-red-50 rounded-[15px] text-red-700">
                        <p className="font-medium">Payment Error</p>
                        <p className="text-sm">{paypalError}</p>
                      </div>
                    )}
                    
                    <PayPalScriptProvider options={initialOptions}>
                      {orderProcessing && (
                        <div className="flex justify-center items-center py-6">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-adrians-red"></div>
                          <span className="ml-2 text-adrians-red">Processing payment...</span>
                        </div>
                      )}
                      <div className={orderProcessing ? "opacity-50 pointer-events-none" : ""}>
                        {formIsValid ? (
                        <PayPalButtons
                          style={{
                            color: "gold",
                            shape: "rect",
                            label: "paypal",
                            layout: "vertical",
                            tagline: false,
                            height: 55,
                            fundingicons: true
                          }}
                          createOrder={(data, actions) => {
                            // Validación básica antes de crear la orden
                            if (!firstName || !lastName || !email) {
                              setPaypalError("Please fill at least your name and email before proceeding with payment");
                              return Promise.reject(new Error("Please fill required fields"));
                            }
                            
                            // Desaparecer el error si existía
                            setPaypalError(null);
                            setOrderProcessing(true);
                            
                            // Detener el temporizador cuando se inicia el proceso de pago
                            if (timerRef.current) {
                              clearInterval(timerRef.current);
                            }
                            
                            return actions.order.create({
                                purchase_units: [
                                  {
                                    description: "Adrian's Coffee Tour Booking",
                                    amount: {
                                      value: bookingData.total || "0.00",
                                      currency_code: "USD",
                                      breakdown: {
                                        item_total: {
                                          currency_code: "USD",
                                          value: (parseFloat(bookingData.total) - parseFloat(bookingData.taxes || "0")).toFixed(2)
                                        },
                                        tax_total: {
                                          currency_code: "USD",
                                          value: bookingData.taxes || "0.00"
                                        }
                                      }
                                    },
                                    items: [
                                      {
                                        name: "Coffee Tour",
                                        description: `${bookingData.adults || "0"} adults${parseInt(bookingData.children) > 0 ? `, ${bookingData.children} children` : ""} (${bookingData.formattedDate || "N/A"}, ${bookingData.scheduleTime || "N/A"})`,
                                        unit_amount: {
                                          currency_code: "USD",
                                          value: bookingData.adultPrice || "0.00"
                                        },
                                        quantity: bookingData.adults || "0",
                                        category: "DIGITAL_GOODS"
                                      },
                                      ...(parseInt(bookingData.children) > 0 ? [{
                                        name: "Coffee Tour - Child",
                                        unit_amount: {
                                          currency_code: "USD",
                                          value: bookingData.childPrice || "0.00"
                                        },
                                        quantity: bookingData.children || "0",
                                        category: "DIGITAL_GOODS"
                                      }] : [])
                                    ],
                                    shipping: {
                                      name: {
                                        full_name: `${firstName} ${lastName}`.trim() || "Customer"
                                      },
                                      address: {
                                        address_line_1: address || "",
                                        admin_area_2: city || "",
                                        admin_area_1: selectedState || "",
                                        postal_code: zipCode || "",
                                        country_code: selectedCountry || "US"
                                      },
                                      email_address: email || ""
                                    }
                                  }
                                ],
                                application_context: {
                                  shipping_preference: "SET_PROVIDED_ADDRESS",
                                  user_action: "PAY_NOW"
                                }
                              });
                          }}
                          onApprove={(data, actions) => {
                            setOrderProcessing(true);
                            return actions.order.capture().then(function(details) {
                              console.log("Payment completed", details);
                              setOrderProcessing(false);
                              // Aquí se procesaría la lógica de guardar la reserva en la base de datos
                              
                              // Marcar la orden como completada y detener el temporizador
                              setOrderCompleted(true);
                              if (timerRef.current) {
                                clearInterval(timerRef.current);
                              }
                            });
                          }}
                          onError={(err) => {
                            setOrderProcessing(false);
                            setPaypalError("First complete the billing information.");
                            console.error("PayPal Error:", err);
                          }}
                          onCancel={() => {
                            setOrderProcessing(false);
                            console.log("Payment cancelled");
                          }}
                        />
                        ) : null}
                      </div>
                    </PayPalScriptProvider>
                  </>
                )}
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Footer */}
        <div 
          className="
            flex w-full items-cesnter justify-start  gap-4 text-sm text-adrians-brown/70 mt-[20px]
            max-sm:flex-col max-sm:gap-2
          "
        >
          <span>&copy; {new Date().getFullYear()} All Rights Reserved</span>
          <div className="flex items-center gap-4 max-sm:gap-3
            max-sm:flex-col max-sm:items-start
            max-sm:mt-2">
            <Link to="/terms" className="hover:text-adrians-red transition-colors duration-300">Terms</Link>
            <Link to="/privacy" className="hover:text-adrians-red transition-colors duration-300">Privacy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
