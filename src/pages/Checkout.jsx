import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnimatePresence } from "framer-motion";

// Components
import { Navbar } from "../components/shared/Navbar.jsx";
import { Spinner } from "../components/shared/Spinner.jsx";
import { SuccessModal } from "../components/SuccessModal.jsx";
import { FeedbackModal } from "../components/FeedbackModal.jsx";
import { Countdown } from "../components/checkout/Countdown.jsx";
import { BookingDetails } from "../components/checkout/BookingDetails.jsx";
import { BillingForm } from "../components/checkout/BillingForm.jsx";
import { PaymentSection } from "../components/checkout/PaymentSection.jsx";

// Context
import { useBooking } from "../context/BookingContext.jsx";

// Services & Config
import paypalConfig from "../config/paypalConfig.js";

// Hooks
import { useAvailabilityCheck } from "../hooks/useAvailabilityCheck.js";

/**
 * Checkout Page Component
 * 
 * Handles the entire checkout process including collecting billing information,
 * displaying booking details, verifying availability, and processing payment.
 * 
 * @component
 */
export function Checkout() {
  // References and navigation
  const mainContainerRef = useRef(null);
  const navigate = useNavigate();
  
  // Get booking data from context
  const { bookingData } = useBooking();
  
  // PayPal configuration
  const [paypalError, setPaypalError] = useState(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(10); // 10 seconds for redirection
  
  // Form and payment states
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Billing information
  const [billingInfo, setBillingInfo] = useState(null);
  
  // Availability checking hook
  const {
    verifyAvailability,
    isChecking: availabilityChecking,
    showLoadingModal,
    hasError: availabilityError,
    errorMessage: availabilityErrorMessage,
    clearError
  } = useAvailabilityCheck();
  
  // State for availability error modal
  const [showAvailabilityError, setShowAvailabilityError] = useState(false);
  
  // Reservation timeout (10 minutes)
  const RESERVATION_TIMEOUT = 600;
  
  // PayPal initial options
  const initialOptions = {
    "client-id": paypalConfig[paypalConfig.environment].clientId,
    currency: "USD",
    intent: "capture"
  };

  /**
   * Effect for page title and navigation warning
   */
  useEffect(() => {
    document.title = "Checkout - Adrian's Coffee Tour";
    
    // If no data in context, redirect to home
    if (!bookingData) {
      navigate('/');
      return;
    }
    
    // Add warning when user tries to leave the page
    window.onbeforeunload = () => "Are you sure you want to leave? Your booking information will be lost.";
    
    // Cleanup function
    return () => {
      window.onbeforeunload = null;
    };
  }, [bookingData, navigate]);
  
  /**
   * Handles countdown expiration
   * Redirects to home if order is not completed
   */
  const handleCountdownExpire = () => {
    if (!orderCompleted) {
      navigate('/');
    }
  };
  
  /**
   * Starts redirect countdown
   * Updates countdown timer and redirects when it reaches 0
   */
  const startRedirectCountdown = () => {
    const redirectTimer = setInterval(() => {
      setRedirectCountdown(prev => {
        if (prev <= 1) {
          clearInterval(redirectTimer);
          setTimeout(() => {
            navigate('/');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  /**
   * Shows availability error modal and starts redirect countdown
   * @param {string} message - Error message to display
   */
  const showAvailabilityErrorModal = (message) => {
    setShowAvailabilityError(true);
    setRedirectCountdown(10); // Reset countdown
    startRedirectCountdown();
  };

  /**
   * Handles billing form submission
   * @param {Object} formData - Collected form data
   * @param {boolean} isValid - Whether the form is valid
   */
  const handleBillingFormSubmit = async (formData, isValid) => {
    setFormIsValid(isValid);
    
    if (isValid) {
      // Save billing information
      setBillingInfo(formData);
      
      // Verify availability before showing payment section
      const isAvailable = await verifyAvailability(bookingData);
      
      if (isAvailable) {
        // Show payment section if form is valid and schedule is available
        setShowPaymentSection(true);
        setFormError("");
        
        // Scroll down to show payment section
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      } else if (availabilityErrorMessage) {
        showAvailabilityErrorModal(availabilityErrorMessage);
        setShowPaymentSection(false);
      }
    } else {
      // If form is invalid, show error message
      setShowPaymentSection(false);
      setFormError("Please complete all the billing information fields");
    }
  };
  
  /**
   * Callback for PayPal payment button click
   * @returns {Promise<boolean>} Whether payment should proceed
   */
  const handlePaymentClick = async () => {
    // Final verification before payment
    try {
      const isAvailable = await verifyAvailability(bookingData);
      if (!isAvailable) {
        // Verification already handles showing the modal
        return false;
      }
      return true;
    } catch (error) {
      setPaypalError("Failed to verify schedule availability. Please try again.");
      return false;
    }
  };
  
  /**
   * Creates PayPal order
   * @returns {Promise<string>} Order ID
   */
  const createPayPalOrder = (data, actions) => {
    // Create PayPal order with booking details
    return actions.order.create({
      purchase_units: [
        {
          description: `Coffee Tour - ${bookingData.formattedDate || "Not specified"}`,
          amount: {
            currency_code: "USD",
            value: bookingData.total || "0.00",
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: (bookingData.total - bookingData.taxes) || "0.00"
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
              description: `${bookingData.adults} adults${bookingData.children > 0 ? `, ${bookingData.children} children` : ""}`,
              quantity: "1",
              unit_amount: {
                currency_code: "USD",
                value: (bookingData.total - bookingData.taxes) || "0.00"
              },
              category: "DIGITAL_GOODS"
            }
          ]
        }
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING"
      }
    });
  };
  
  /**
   * Handles successful PayPal payment approval
   */
  const onPayPalApprove = (data, actions) => {
    // Complete the PayPal payment
    return actions.order.capture().then(function(details) {
      // Handle successful payment
      setOrderCompleted(true);
      setRedirectCountdown(10);
      startRedirectCountdown();
      
      // Send confirmation email and save booking details to database
      // This would typically be handled by an API call to the backend
      console.log("Payment completed:", details);
      console.log("Booking details:", bookingData);
      console.log("Billing information:", billingInfo);
    });
  };
  
  /**
   * Handles PayPal errors
   */
  const onPayPalError = (err) => {
    setPaypalError(`Payment failed: ${err.message || "Unknown error"}`);
  };

  // If no booking data, show loading spinner
  if (!bookingData) {
    return (
      <>
        <Navbar />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Feedback modals */}
      <AnimatePresence>
        {orderCompleted && (
          <SuccessModal countdown={redirectCountdown} />
        )}
        
        {/* Availability error modal */}
        {showAvailabilityError && (
          <FeedbackModal 
            countdown={redirectCountdown} 
            isSuccess={false}
            title="Schedule Not Available"
            message={availabilityErrorMessage || "This schedule is no longer available. Please select another schedule."}
          />
        )}
        
        {/* Loading modal during availability verification */}
        {showLoadingModal && (
          <FeedbackModal 
            isLoading={true}
            showCountdown={false}
            title="Verifying Availability"
            message="We are verifying the availability of your selected schedule. This will take only a few seconds..."
          />
        )}
      </AnimatePresence>
      
      <div className="
        flex flex-col justify-center items-center gap-[40px] 
        w-[80vw] m-auto py-[40px] min-h-screen mt-[100px]
        max-xl:w-[90vw] max-lg:mt-[60px]
      " ref={mainContainerRef}>
        <h1 className="text-3xl font-bold text-adrians-red text-center">Checkout</h1>
        
        {/* Reservation Countdown Timer */}
        <div className="w-full p-4 flex flex-col items-center justify-center gap-[20px]">
          <Countdown 
            initialSeconds={RESERVATION_TIMEOUT}
            onExpire={handleCountdownExpire}
            showTitle={true}
            showProgressBar={true}
            className="w-full flex flex-col items-center justify-center gap-3"
          />
        </div>
        
        <div className="
          grid grid-cols-1 lg:grid-cols-2 gap-[60px] w-full
          max-lg:gap-[40px] 
        ">
          {/* Left column - Billing Information */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <BillingForm 
              onSubmit={handleBillingFormSubmit}
              formError={formError}
              isProcessing={availabilityChecking}
            />
          </div>
          
          {/* Right column - Booking Details */}
          <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            <BookingDetails 
              bookingData={bookingData} 
              className="sticky top-[120px]"
            />
            
            {/* Payment Section (conditionally rendered) */}
            <PayPalScriptProvider options={initialOptions}>
              {showPaymentSection && (
                <PaymentSection
                  isVisible={showPaymentSection}
                  isCompleted={orderCompleted}
                  paypalError={paypalError}
                  initialOptions={initialOptions}
                  onPaymentClick={handlePaymentClick}
                  onCreateOrder={createPayPalOrder}
                  onApprove={onPayPalApprove}
                  onError={onPayPalError}
                  className="mt-8"
                />
              )}
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
