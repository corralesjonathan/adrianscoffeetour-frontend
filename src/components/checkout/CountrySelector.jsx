import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllCountries } from '../../services/countryService';

/**
 * Country Selector Component
 * 
 * A dropdown component to select countries with search functionality.
 * 
 * @component
 */
export function CountrySelector({
  selectedCountry,
  onSelect,
  className = "",
  labelText = "Country"
}) {
  // State for dropdown and search functionality
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  
  // Initialize filtered countries with all countries
  useEffect(() => {
    setFilteredCountries(getAllCountries());
  }, []);
  
  /**
   * Gets the country name from code
   * 
   * @param {string} code - Country code
   * @returns {string} Country name or code if not found
   */
  const getCountryName = (code) => {
    const country = getAllCountries().find(c => c.code === code);
    return country ? country.name : code;
  };
  
  /**
   * Handles search input changes and filters countries accordingly
   * 
   * @param {Object} e - Event object
   */
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = getAllCountries().filter(country => 
      country.name.toLowerCase().includes(query) || 
      country.code.toLowerCase().includes(query)
    );
    
    setFilteredCountries(filtered);
  };
  
  /**
   * Handles country selection
   * 
   * @param {Object} country - Selected country object
   */
  const handleSelect = (country) => {
    onSelect(country.code);
    setIsOpen(false);
    setSearchQuery("");
    setFilteredCountries(getAllCountries());
  };
  
  return (
    <div className={`relative w-full ${className}`}>
      <label htmlFor="country" className="block text-sm font-medium text-adrians-brown mb-1">
        {labelText}
      </label>
      
      {/* Selected country button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-2 focus:ring-adrians-red focus:border-transparent transition-all duration-300 cursor-pointer"
        data-testid="country-selector"
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {getCountryName(selectedCountry)}
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
      
      {/* Dropdown for countries */}
      {isOpen && (
        <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto"
          data-testid="country-dropdown"
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
              data-testid="country-search"
            />
          </div>
          
          {/* List of countries */}
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleSelect(country)}
              className="p-3 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
              data-testid={`country-option-${country.code}`}
            >
              <span className="text-gray-700">{country.name}</span>
              <span className="ml-2 text-xs text-gray-500">{country.code}</span>
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
      
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        id="country"
        name="country"
        value={selectedCountry}
      />
    </div>
  );
}

// PropTypes for type checking and documentation
CountrySelector.propTypes = {
  /** Currently selected country code */
  selectedCountry: PropTypes.string.isRequired,
  /** Callback function when a country is selected */
  onSelect: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Label text for the selector */
  labelText: PropTypes.string
};
