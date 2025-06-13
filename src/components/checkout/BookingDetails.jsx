import React from 'react';
import PropTypes from 'prop-types';

/**
 * BookingDetails Component
 * 
 * A reusable component that displays booking details in a well-formatted card
 * including date, schedule, number of participants, and price breakdown.
 * 
 * @component
 */
export function BookingDetails({ 
  bookingData, 
  className, 
  showTitle = true,
  titleClassName = "text-xl font-semibold text-adrians-red mb-6",
  cardClassName = "bg-adrians-red/5 rounded-[15px] p-6"
}) {
  // Ensure bookingData exists to prevent errors
  if (!bookingData) {
    console.warn('BookingDetails component received empty or invalid bookingData');
    return null;
  }

  /**
   * Formats a currency value ensuring it has two decimal places
   * @param {number|string} value - The value to format
   * @returns {string} The formatted price (e.g., "10.00")
   */
  const formatPrice = (value) => {
    if (!value && value !== 0) return "0.00";
    return parseFloat(value).toFixed(2);
  };

  // Extract values with fallbacks to prevent rendering errors
  const {
    formattedDate = "Not available",
    scheduleTime = "Not specified",
    adults = 0,
    adultPrice = 0,
    children = 0,
    childPrice = 0,
    taxes = 0,
    total = 0
  } = bookingData;

  // Check if there are children in the booking
  const hasChildren = parseInt(children) > 0;

  return (
    <div className={className}>
      {/* Optional title section */}
      {showTitle && (
        <h2 className={titleClassName}>Booking Details</h2>
      )}
      
      {/* Main booking details card */}
      <div className={cardClassName}>
        {/* Date and schedule information */}
        <div className="space-y-4">
          <div>
            <p className="text-adrians-brown mb-2">
              <span className="font-medium">Date:</span> {formattedDate}
            </p>
            <p className="text-adrians-brown mb-2">
              <span className="font-medium">Schedule:</span> {scheduleTime}
            </p>
          </div>
          
          {/* Participants information */}
          <div>
            <p className="text-adrians-brown mb-2">
              <span className="font-medium">Adults:</span> {adults}x${formatPrice(adultPrice)}
            </p>
            {hasChildren && (
              <p className="text-adrians-brown mb-2">
                <span className="font-medium">Children:</span> {children}x${formatPrice(childPrice)}
              </p>
            )}
          </div>
        </div>
        
        {/* Price summary section with divider */}
        <div className="border-t border-adrians-red/20 mt-4 pt-4">
          <p className="text-adrians-brown mb-1">
            <span className="font-medium">Taxes:</span> ${formatPrice(taxes)}
          </p>
          <p className="text-xl font-semibold text-adrians-red">
            <span className="font-bold">Total:</span> ${formatPrice(total)}
          </p>
        </div>
      </div>
    </div>
  );
}

// PropTypes for type checking and documentation
BookingDetails.propTypes = {
  /** Booking data object containing all reservation details */
  bookingData: PropTypes.shape({
    /** Formatted date string of the booking (e.g., "June 15, 2025") */
    formattedDate: PropTypes.string,
    /** Selected time slot (e.g., "9:00 AM - 12:00 PM") */
    scheduleTime: PropTypes.string,
    /** Number of adults in the booking */
    adults: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Price per adult */
    adultPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Number of children in the booking */
    children: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Price per child */
    childPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Tax amount applied to the booking */
    taxes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /** Total booking price including taxes */
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  /** Additional CSS classes to apply to the component container */
  className: PropTypes.string,
  /** Whether to display the "Booking Details" title */
  showTitle: PropTypes.bool,
  /** CSS classes to apply to the title */
  titleClassName: PropTypes.string,
  /** CSS classes to apply to the card container */
  cardClassName: PropTypes.string
};

