import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStatesByCountry, getGenericState } from '../../services/countryService';

/**
 * State/Province Selector Component
 * 
 * A dropdown component to select states or provinces for a country with search functionality.
 * 
 * @component
 */
export function StateSelector({
  selectedCountry,
  selectedState,
  onSelect,
  className = "",
  labelText = "State / Province"
}) {
  // State for dropdown and search functionality
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableStates, setAvailableStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  
  // Update available states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const states = getStatesByCountry(selectedCountry);
      setAvailableStates(states);
      setFilteredStates(states);
      
      // Set default state when country changes
      if (states.length > 0 && !selectedState) {
        onSelect(states[0].code);
      } else if (states.length === 0 && !selectedState) {
        const genericState = getGenericState(selectedCountry);
        onSelect(genericState.code);
      }
    }
  }, [selectedCountry, selectedState, onSelect]);
  
  // Filter states based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = availableStates.filter(state => 
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStates(filtered);
    } else {
      setFilteredStates(availableStates);
    }
  }, [searchQuery, availableStates]);
  
  /**
   * Gets the state name from code
   * 
   * @param {string} code - State code
   * @returns {string} State name or generic state name
   */
  const getStateName = () => {
    const state = availableStates.find(s => s.code === selectedState);
    if (state) return state.name;
    
    const genericState = getGenericState(selectedCountry);
    return genericState.name;
  };
  
  /**
   * Handles state selection
   * 
   * @param {Object} state - Selected state object
   */
  const handleSelect = (stateCode) => {
    onSelect(stateCode);
    setIsOpen(false);
    setSearchQuery("");
  };
  
  return (
    <div className={`relative ${className}`}>
      <label htmlFor="state" className="block text-sm font-medium text-adrians-brown mb-1">
        {labelText}
      </label>
      
      {/* Selected state button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-adrians-brown/30 rounded-full flex justify-between items-center cursor-pointer hover:border-adrians-red transition-all duration-300"
        data-testid="state-selector"
      >
        <span className="text-adrians-brown overflow-hidden text-ellipsis">
          {getStateName()}
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
      
      {/* Dropdown for states */}
      {isOpen && (
        <div className="absolute z-10 left-0 right-0 mt-2 bg-white border border-adrians-brown/10 rounded-[15px] shadow-lg max-h-[300px] overflow-y-auto"
          data-testid="state-dropdown"
        >
          {availableStates.length > 0 ? (
            <>
              {/* Search input */}
              <div className="sticky top-0 bg-white p-2 border-b border-adrians-brown/10">
                <input 
                  type="text" 
                  placeholder="Search state/province..."
                  className="w-full p-2 border border-adrians-brown/30 rounded-full focus:outline-none focus:ring-1 focus:ring-adrians-red focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                  value={searchQuery}
                  data-testid="state-search"
                />
              </div>
              
              {/* List of states */}
              {filteredStates.map((state) => (
                <div
                  key={state.code}
                  onClick={() => handleSelect(state.code)}
                  className="p-3 cursor-pointer hover:bg-adrians-red/5 transition-all duration-200"
                  data-testid={`state-option-${state.code}`}
                >
                  <span className="text-gray-700">{state.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{state.code}</span>
                </div>
              ))}
              
              {/* No results message */}
              {searchQuery && filteredStates.length === 0 && (
                <div className="p-3 text-center text-gray-500">
                  No states/provinces found matching "{searchQuery}"
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
      
      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        id="state"
        name="state"
        value={selectedState || ''}
      />
    </div>
  );
}

// PropTypes for type checking and documentation
StateSelector.propTypes = {
  /** Currently selected country code */
  selectedCountry: PropTypes.string.isRequired,
  /** Currently selected state code */
  selectedState: PropTypes.string,
  /** Callback function when a state is selected */
  onSelect: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Label text for the selector */
  labelText: PropTypes.string
};
