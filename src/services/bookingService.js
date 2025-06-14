import axios from 'axios';

/**
 * Service for booking-related API operations
 * Handles creating new bookings and related operations
 */

/**
 * Saves a new booking to the database after successful payment
 * 
 * @param {Object} bookingData - Tour booking information
 * @param {Object} customerInfo - Customer billing information
 * @param {Object} paymentDetails - Payment transaction details
 * @returns {Promise<Object>} Response from the API
 */
export const saveBooking = async (bookingData, customerInfo, paymentDetails) => {
  console.log("SaveBooking called with:", { bookingData, customerInfo });
  console.log("Payment details:", paymentDetails);
  
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  console.log("API URL:", apiUrl);
  
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

  // Determine payment method based on PayPal details
  const paymentMethod = paymentDetails.payment_source?.paypal ? 'paypal' : 'card';
  
  try {
    // Handle case when selectedDateId is an object with schedule keys
    let availableDateId = bookingData.selectedDateId;
    
    if (typeof bookingData.selectedDateId === 'object' && bookingData.selectedDateId !== null) {
      // If it's an object, try to get the ID based on selected schedule time
      if (bookingData.scheduleTime && bookingData.selectedDateId[bookingData.scheduleTime]) {
        availableDateId = bookingData.selectedDateId[bookingData.scheduleTime];
      } else {
        // If we can't find by schedule time, use the first available ID
        const firstKey = Object.keys(bookingData.selectedDateId)[0];
        if (firstKey) {
          availableDateId = bookingData.selectedDateId[firstKey];
        }
      }
    }
    
    console.log("Using available_date_id:", availableDateId);
    
    // Format phone number correctly
    let phoneNumber = customerInfo.phone;
    let callingCode = '';
    
    // Extract calling code if phone has a space after the code
    if (phoneNumber && phoneNumber.indexOf(' ') > 0) {
      callingCode = phoneNumber.split(' ')[0].replace('+', '');
      phoneNumber = phoneNumber.substring(phoneNumber.indexOf(' ')).replace(/\D/g, '');
    } else if (phoneNumber) {
      // If no space, just remove non-digits
      phoneNumber = phoneNumber.replace(/\D/g, '');
    }
    
    // Ensure numeric values
    const total = parseFloat(bookingData.total || 0);
    const taxes = parseFloat(bookingData.taxes || 0);
    const subtotal = total - taxes;
    
    console.log("Total values:", { total, taxes, subtotal });
    
    // Format request body according to the API specification
    const requestBody = {
      available_date_id: availableDateId,
      adults: parseInt(bookingData.adults) || 0,
      children: parseInt(bookingData.children) || 0,
      total_people: (parseInt(bookingData.adults) || 0) + (parseInt(bookingData.children) || 0),
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(taxes.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      name: customerInfo.firstName,
      lastname: customerInfo.lastName,
      address: customerInfo.address,
      address2: customerInfo.address,
      city: customerInfo.city,
      state: customerInfo.state,
      zip: customerInfo.zipCode,
      country: customerInfo.country,
      phone: phoneNumber, 
      calling_code: callingCode,
      email: customerInfo.email,
      status: "paid",  // Since we only submit after successful payment
      date: bookingData.date || new Date().toISOString().split('T')[0],
      payment_method: paymentMethod
    };
    
    console.log("Sending request to API:", `${apiUrl}/bookings`);
    console.log("Request body:", JSON.stringify(requestBody));

    const response = await axios.post(
      `${apiUrl}/bookings`,
      requestBody,
      { headers }
    );
    
    console.log("API response:", response);

    return {
      success: true,
      data: response.data,
      message: 'Booking successfully saved'
    };
  } catch (error) {
    console.error('Error saving booking:', error);
    console.error('Error details:', JSON.stringify(error.response?.data || {}));
    
    return {
      success: false,
      message: error.response?.data?.message || 'Error saving booking details',
      error: error.message
    };
  }
};
