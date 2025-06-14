import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CountrySelector } from './CountrySelector';
import { StateSelector } from './StateSelector';
import { CountryCodeSelector } from './CountryCodeSelector';
import { defaultCountry, defaultCountryCode } from '../../services/countryService';

/**
 * Billing Form Component
 * 
 * A comprehensive form for collecting billing information from users.
 * 
 * @component
 */
export function BillingForm({
  onSubmit,
  formError = "",
  isProcessing = false,
  className = ""
}) {
  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  
  // Country and state selectors state
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountryCode);
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [selectedState, setSelectedState] = useState("");
  
  /**
   * Validates form fields
   * @returns {boolean} True if the form is valid
   */
  const validateForm = () => {
    // Validate that all required fields are completed
    return (
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      email.trim() !== '' &&
      phone.trim() !== '' &&
      address.trim() !== '' &&
      city.trim() !== '' &&
      zipCode.trim() !== '' &&
      selectedCountry !== '' &&
      selectedState !== ''
    );
  };
  
  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    
    if (isValid) {
      // Collect form data
      const formData = {
        firstName,
        lastName,
        email,
        phone: `${selectedCountryCode.code} ${phone}`,
        address,
        city,
        state: selectedState,
        country: selectedCountry,
        zipCode
      };
      
      // Pass data to parent component
      onSubmit(formData, isValid);
    } else {
      // Form is invalid, let parent know
      onSubmit({}, false);
    }
  };
  
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold text-adrians-red mb-6">Billing Information</h2>
      
      {/* Error message display */}
      {formError && (
        <div className="p-4 mb-4 bg-red-50 rounded-[15px] text-red-700">
          <p className="font-medium">Error</p>
          <p className="text-sm">{formError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-adrians-brown mb-1">First Name</label>
            <input 
              type="text" 
              id="firstName"
              className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              data-testid="billing-first-name"
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
              data-testid="billing-last-name"
            />
          </div>
        </div>
        
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-adrians-brown mb-1">Email Address</label>
          <input 
            type="email" 
            id="email"
            className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="billing-email"
          />
        </div>
        
        {/* Phone field with country code selector */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-adrians-brown mb-1">Phone</label>
          <div className="relative flex items-center">
            <CountryCodeSelector 
              selectedCode={selectedCountryCode}
              onSelect={setSelectedCountryCode}
              onCountryFlagChange={setSelectedCountry}
              className="w-[30%] mr-2"
            />
            
            <input 
              type="tel" 
              id="phone"
              className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              placeholder="123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              data-testid="billing-phone"
            />
          </div>
        </div>
        
        {/* Country selector */}
        <CountrySelector
          selectedCountry={selectedCountry}
          onSelect={setSelectedCountry}
        />
        
        {/* City, State, Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-adrians-brown mb-1">City</label>
            <input 
              type="text" 
              id="city"
              className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              data-testid="billing-city"
            />
          </div>
          
          <StateSelector 
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            onSelect={setSelectedState}
          />
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-adrians-brown mb-1">Postal / Zip Code</label>
            <input 
              type="text" 
              id="zipCode"
              className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              data-testid="billing-zip"
            />
          </div>
        </div>
        
        {/* Address field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-adrians-brown mb-1">Address</label>
          <input 
            type="text" 
            id="address"
            className="w-full p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            data-testid="billing-address"
          />
        </div>
        
        {/* Submit button */}
        <div className="mt-6">
          <button 
            type="submit"
            disabled={isProcessing}
            className={`
              group cursor-pointer shadow-adrians-btn-shadow hover:shadow-adrians-btn-shadow-hover 
              hover:scale-105 transition-all duration-300 ease-in-out w-full py-3 px-6 
              bg-adrians-red text-white rounded-full hover:bg-adrians-red/90 
              transition-all duration-300 font-medium flex items-center justify-center
              ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            data-testid="billing-submit"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Verifying Availability...
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// PropTypes for type checking and documentation
BillingForm.propTypes = {
  /** Function called on form submission with form data and validity */
  onSubmit: PropTypes.func.isRequired,
  /** Error message to display at the top of the form */
  formError: PropTypes.string,
  /** Loading state for the submit button */
  isProcessing: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string
};
