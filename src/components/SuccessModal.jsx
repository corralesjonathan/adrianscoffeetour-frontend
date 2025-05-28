import { motion } from "framer-motion";

export function SuccessModal({ countdown, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[9999]">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="bg-white rounded-[20px] p-8 shadow-2xl max-w-md w-full mx-4 text-center"
      >
        <div className="mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-green-100">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
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
        <h2 className="text-2xl font-bold text-adrians-brown mb-4">¡Reserva Exitosa!</h2>
        <p className="text-adrians-brown mb-8">Tu reserva ha sido confirmada. Te hemos enviado un email con los detalles.</p>
        <p className="text-sm text-adrians-brown/70">Regresando al inicio en {countdown} segundos...</p>
      </motion.div>
    </div>
  );
}
