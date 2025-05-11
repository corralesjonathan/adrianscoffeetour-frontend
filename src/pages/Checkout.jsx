import { Navbar } from "../components/shared/Navbar.jsx";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { countryCodes, defaultCountryCode } from "../data/countryCodes.js";

export function Checkout() {
  const navigate = useNavigate();
  // Obtener los datos directamente del contexto
  const { bookingData } = useBooking();
  
  // Estados para el selector de código de país
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode);
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);

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
        w-[80vw] m-auto py-[40px] min-h-screen mt-[40px]
        max-xl:w-[90vw]
      ">
        <h1 className="text-3xl font-bold text-adrians-red text-center mb-4">Checkout</h1>
        
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-8 w-full
          max-lg:gap-[40px]
        ">
          {/* Columna izquierda - Billing Information */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
            className="p-[40px]"
          >
            <h2 className="text-xl font-semibold text-adrians-red mb-6">Billing Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-adrians-brown mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-adrians-brown mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-adrians-brown mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-adrians-brown mb-1">Address</label>
                <input 
                  type="text" 
                  id="address"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
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
                        {selectedCountryCode}
                      </span>
                      <span className="text-adrians-red text-xs ml-1">
                        ▼
                      </span>
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
                              const filtered = countryCodes.filter(country => 
                                country.country.toLowerCase().includes(query) || 
                                country.code.toLowerCase().includes(query)
                              );
                              setFilteredCountries(filtered);
                            }}
                            value={searchQuery}
                          />
                        </div>
                        {(searchQuery ? filteredCountries : countryCodes).map((country, index) => (
                          <div
                            key={`${country.code}-${index}`}
                            onClick={() => {
                              setSelectedCountryCode(country.code);
                              setIsCountryCodeOpen(false);
                              setSearchQuery(""); // Limpiar la búsqueda al seleccionar
                              setFilteredCountries(countryCodes);
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
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-adrians-brown mb-1">State / Province</label>
                  <input 
                    type="text" 
                    id="state"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-adrians-brown mb-1">ZIP / Postal Code</label>
                  <input 
                    type="text" 
                    id="zip"
                    className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-adrians-brown mb-1">Country</label>
                <input 
                  type="text" 
                  id="country"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          {/* Columna derecha - Booking Details */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
            className="p-[40px] "
          >
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
        </div>
        
        {/* Footer minimal */}
        <div 
          className="
            flex items-center justify-center gap-4 text-sm text-adrians-brown/70 mt-8
            max-sm:flex-col max-sm:gap-2
          "
        >
          <span>&copy; 2025 All Rights Reserved</span>
          <div className="flex items-center gap-4 max-sm:gap-3">
            <Link to="/terms" className="hover:text-adrians-red transition-colors duration-300">Terms</Link>
            <Link to="/privacy" className="hover:text-adrians-red transition-colors duration-300">Privacy</Link>
          </div>
        </div>
      </div>
    </>
  );
}
