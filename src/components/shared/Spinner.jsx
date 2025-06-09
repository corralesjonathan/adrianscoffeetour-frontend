import { motion } from "framer-motion";
import ReactDOM from "react-dom";

export function Spinner({ noPortal = false }) {
  // Contenido del spinner
  const spinnerContent = (
    <motion.div
      className="fixed inset-0 z-[9999] bg-adrians-red flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <span className="loader"></span>
    </motion.div>
  );
  
  // Si noPortal es true, renderizar directamente sin portal
  if (noPortal) {
    return spinnerContent;
  }
  
  // Por defecto, usar portal para renderizar fuera de cualquier contexto de apilamiento
  return ReactDOM.createPortal(spinnerContent, document.body);
}
