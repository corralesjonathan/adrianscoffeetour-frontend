import { motion } from "framer-motion";

export function SuccessModal({ countdown, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 120 }}
        className="bg-white rounded-[20px] p-8 shadow-2xl max-w-md w-full mx-4 text-center"
      >
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
        <h2 className="text-2xl font-bold text-adrians-brown mb-4">Booking Successful!</h2>
        <p className="text-adrians-brown mb-8">Your booking has been confirmed. We've sent you an email with the details.</p>
        <p className="text-sm text-adrians-brown/70">Returning to home in {countdown} seconds...</p>
      </motion.div>
    </div>
  );
}
