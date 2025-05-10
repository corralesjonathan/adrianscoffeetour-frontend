import { useMemo } from 'react';

export const useBookingCalculations = ({ adults, children, adultPrice, childPrice, taxRate }) => {
  const subtotal = useMemo(() => {
    return adults * adultPrice + children * childPrice;
  }, [adults, children, adultPrice, childPrice]);

  const taxes = useMemo(() => {
    return taxRate ? subtotal * taxRate : 0;
  }, [subtotal, taxRate]);

  const total = useMemo(() => {
    return subtotal + taxes;
  }, [subtotal, taxes]);

  return {
    subtotal,
    taxes,
    total
  };
};
