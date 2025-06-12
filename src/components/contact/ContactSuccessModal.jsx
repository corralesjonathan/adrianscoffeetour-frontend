import { motion } from "framer-motion";

/**
 * Success modal for contact form submission
 * @param {Object} props - Component props
 * @param {boolean} props.show - Whether to show the modal
 * @param {function} props.onClose - Function to call when closing the modal
 */
export function ContactSuccessModal({ show, onClose }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 120 }}
        className="bg-white rounded-[20px] p-8 shadow-2xl max-w-md w-full mx-4 text-center relative"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-adrians-red hover:text-adrians-red/80 transition-colors"
          aria-label="Close modal"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
        <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-green-100">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 130 }}
            className="w-12 h-12 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
        <h2 className="text-2xl font-bold text-adrians-brown mb-4">Message Sent Successfully!</h2>
        <p className="text-adrians-brown mb-4">Thank you for reaching out to us. We'll get back to you as soon as possible.</p>
      </motion.div>
    </div>
  );
}
