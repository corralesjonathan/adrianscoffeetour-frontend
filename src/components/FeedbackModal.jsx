import { motion } from "framer-motion";

/**
 * Flexible feedback modal for success, error, or loading messages
 * @param {Object} props - Component properties
 * @param {number} props.countdown - Countdown in seconds (only for success/error)
 * @param {boolean} props.isSuccess - Indicates if it's a success message (vs error)
 * @param {boolean} props.isLoading - Indicates if it's a loading modal
 * @param {string} props.title - Modal title
 * @param {string} props.message - Main message
 * @param {Function} props.onClose - Function to execute when closing the modal
 * @param {boolean} props.showCountdown - Whether to show the countdown
 */
export function FeedbackModal({ 
  countdown, 
  isSuccess = true, 
  isLoading = false,
  title, 
  message, 
  onClose,
  showCountdown = true 
}) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 120 }}
        className="bg-white rounded-[20px] p-8 shadow-2xl max-w-md w-full mx-4 text-center"
      >
        <div className={`mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full ${
          isLoading ? 'bg-blue-100' : isSuccess ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {isLoading ? (
            // Spinner for loading state
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="w-12 h-12 border-t-3 border-b-3 border-adrians-red rounded-full"
            />
          ) : isSuccess ? (
            // Check icon for success
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
          ) : (
            // X icon for error
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 130 }}
              className="w-12 h-12 text-red-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <motion.path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </div>
        <h2 className={`text-2xl font-bold ${
          isLoading ? 'text-adrians-brown' : isSuccess ? 'text-adrians-brown' : 'text-adrians-red'
        } mb-4`}>{title}</h2>
        <p className="text-adrians-brown mb-8">{message}</p>
        {showCountdown && !isLoading && (
          <p className="text-sm text-adrians-brown/70">Returning to home in {countdown} seconds...</p>
        )}
      </motion.div>
    </div>
  );
}
