import { Navbar } from "../components/shared/Navbar.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

export function Checkout() {
  const navigate = useNavigate();
  // Obtener los datos directamente del contexto
  const { bookingData } = useBooking();

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
      <div className="container mx-auto px-4 py-12">
        <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
          className="max-w-3xl mx-auto bg-white rounded-[20px] shadow-adrians-horizontal-card p-8"
        >
          <h1 className="text-3xl font-bold text-adrians-red text-center mb-8">Complete Your Reservation</h1>
          
          <div className="bg-adrians-red/5 rounded-[15px] p-6 mb-8">
            <h2 className="text-xl font-semibold text-adrians-red mb-4">Booking Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <p className="text-adrians-brown mb-2">
                  <span className="font-medium">Children:</span> {bookingData.children || "0"}x${bookingData.childPrice || "0"}
                </p>
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
          
          {/* Contact information form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-adrians-red mb-4">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-adrians-brown mb-1">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-adrians-brown mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-adrians-brown mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-adrians-brown mb-1">Phone</label>
              <input 
                type="tel" 
                id="phone"
                className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="text-center">
            <button 
              className="bg-adrians-red hover:bg-adrians-red/90 text-white font-semibold py-3 px-8 rounded-full shadow-adrians-btn-shadow hover:shadow-adrians-btn-shadow-hover hover:scale-105 transition-all duration-300"
            >
              Complete Reservation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
