import React from 'react';
import PropTypes from 'prop-types';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";

/**
 * Payment Section Component
 * 
 * Handles the payment processing functionality using PayPal.
 * 
 * @component
 */
export function PaymentSection({
  isVisible,
  isCompleted,
  paypalError,
  initialOptions,
  onPaymentClick,
  onCreateOrder,
  onApprove,
  onError,
  className = ""
}) {
  return (
    <motion.div 
      className={`${className} mt-6 pt-4 border-t border-gray-200`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        type: "spring", 
        stiffness: 100, 
        damping: 15
      }}
      data-testid="payment-section"
    >
      <h3 className="text-lg font-semibold text-adrians-red mb-4">Payment Method</h3>
      
      {!isCompleted && (
        <>
          {/* Error message display */}
          {paypalError && (
            <div className="p-4 mb-4 bg-red-50 rounded-[15px] text-red-700">
              <p className="font-medium">Payment Error</p>
              <p className="text-sm">{paypalError}</p>
            </div>
          )}
          
          {/* PayPal payment buttons */}
          <div>
            <PayPalButtons
              style={{
                color: "gold",
                shape: "rect",
                label: "paypal",
                layout: "vertical",
                tagline: false,
                height: 55,
                fundingicons: true
              }}
              onClick={async (data, actions) => {
                try {
                  const shouldContinue = await onPaymentClick();
                  if (!shouldContinue) {
                    return actions.reject();
                  }
                  return actions.resolve();
                } catch (error) {
                  return actions.reject();
                }
              }}
              createOrder={onCreateOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </div>
        </>
      )}
    </motion.div>
  );
}

// PropTypes for type checking and documentation
PaymentSection.propTypes = {
  /** Whether this section should be visible */
  isVisible: PropTypes.bool.isRequired,
  /** Whether payment is completed */
  isCompleted: PropTypes.bool.isRequired,
  /** Error message to display if payment fails */
  paypalError: PropTypes.string,
  /** PayPal initialization options */
  initialOptions: PropTypes.object.isRequired,
  /** Function to call when payment button is clicked, should return boolean */
  onPaymentClick: PropTypes.func.isRequired,
  /** Function to create order with PayPal */
  onCreateOrder: PropTypes.func.isRequired,
  /** Function handling successful payment */
  onApprove: PropTypes.func.isRequired,
  /** Function handling payment errors */
  onError: PropTypes.func.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string
};
