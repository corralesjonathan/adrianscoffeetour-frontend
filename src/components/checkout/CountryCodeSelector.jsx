import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllCountryCodes } from '../../services/countryService';

/**
 * Country Code Selector Component
 * 
 * A dropdown component to select country calling codes with search functionality.
 * 
 * @component
 */
export function CountryCodeSelector({ 
  selectedCode, 
  onSelect,
  onCountryFlagChange,
  className = ""
}) {
  // State for dropdown and search functionality
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  // Initialize filtered countries with all country codes
  useEffect(() => {
    setFilteredCountries(getAllCountryCodes());
  }, []);
  
  /**
   * Handles search input changes and filters countries accordingly
   * 
   * @param {Object} e - Event object
   */
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const allCountryCodes = getAllCountryCodes();
    const filtered = allCountryCodes.filter(country => 
      country.country.toLowerCase().includes(query) || 
      country.code.toLowerCase().includes(query)
    );
    
    setFilteredCountries(filtered);
  };
  
  /**
   * Handles country code selection
   * 
   * @param {Object} country - Selected country object
   */
  const handleSelect = (country) => {
    onSelect(country);
    setIsOpen(false);
    setSearchQuery(""); // Clear search query
    setFilteredCountries(getAllCountryCodes());
    
    // Update country based on flag if available
    if (onCountryFlagChange && country.flag) {
      onCountryFlagChange(country.flag.toUpperCase());
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      {/* Selected country code button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300 cursor-pointer"
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {selectedCode.code}
        </span>
        <svg 
          className={`w-4 h-4 ml-2 text-adrians-red transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {/* Dropdown for country codes */}
      {isOpen && (
        <div 
          className="absolute z-10 w-[300px] mt-1 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto"
          data-testid="country-code-dropdown"
        >
          {/* Search input */}
          <div className="sticky top-0 bg-white p-2 border-b border-adrians-brown/10">
            <input 
              type="text" 
              placeholder="Search country..."
              className="w-full p-2 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-1 focus:ring-adrians-red focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              onChange={handleSearch}
              value={searchQuery}
              data-testid="country-code-search"
            />
          </div>
          
          {/* List of countries */}
          {(searchQuery ? filteredCountries : getAllCountryCodes()).map((country, index) => (
            <div
              key={`${country.code}-${index}`}
              onClick={() => handleSelect(country)}
              className="flex items-center p-2 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
              data-testid={`country-code-option-${country.code}`}
            >
              <span className="mr-2 text-gray-700">{country.country}</span>
              <span className="text-xs text-gray-500">{country.code}</span>
            </div>
          ))}
          
          {/* No results message */}
          {searchQuery && filteredCountries.length === 0 && (
            <div className="p-3 text-center text-gray-500">
              No countries found matching "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// PropTypes for type checking and documentation
CountryCodeSelector.propTypes = {
  /** Currently selected country code object */
  selectedCode: PropTypes.shape({
    /** Country name */
    country: PropTypes.string.isRequired,
    /** Phone country code (e.g., "+1") */
    code: PropTypes.string.isRequired,
    /** ISO country code for the flag */
    flag: PropTypes.string
  }).isRequired,
  /** Callback function when a country code is selected */
  onSelect: PropTypes.func.isRequired,
  /** Optional callback to update country when flag changes */
  onCountryFlagChange: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string
};
