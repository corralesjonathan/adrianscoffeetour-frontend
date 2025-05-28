import { useMemo } from 'react';

/**
 * Custom hook for booking price calculations
 * 
 * @param {Object} params - Calculation parameters
 * @param {number} params.adults - Number of adults
 * @param {number} params.children - Number of children
 * @param {number} params.adultPrice - Price per adult
 * @param {number} params.childPrice - Price per child
 * @param {number} params.taxRate - Tax rate (decimal or percentage)
 * @returns {Object} - Subtotal, taxes, and total amount
 */
export const useBookingCalculations = ({ adults, children, adultPrice, childPrice, taxRate }) => {
  // Calculate subtotal (adults + children prices)
  const subtotal = useMemo(() => {
    return adults * adultPrice + children * childPrice;
  }, [adults, children, adultPrice, childPrice]);

  // Calculate taxes based on subtotal
  const taxes = useMemo(() => {
    return taxRate ? subtotal * taxRate : 0;
  }, [subtotal, taxRate]);

  // Calculate total amount
  const total = useMemo(() => {
    return subtotal + taxes;
  }, [subtotal, taxes]);

  return {
    subtotal,
    taxes,
    total
  };
};
