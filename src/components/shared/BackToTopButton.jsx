import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar/ocultar botón según la posición del scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    
    // Limpieza del event listener
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Función para hacer scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed cursor-pointer z-[998] bottom-[120px] right-[45px] bg-adrians-red text-white p-2 rounded-full shadow-sm hover:bg-adrians-brown transition-all duration-300"
          aria-label="Back to top"
        >
          <IoIosArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
