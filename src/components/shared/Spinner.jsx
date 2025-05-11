import { motion } from "framer-motion";

export function Spinner() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/20 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-adrians-red border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
