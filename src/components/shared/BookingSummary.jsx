import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";

export function BookingSummary({ 
  selected, 
  selectedSchedule, 
  adults, 
  children, 
  tourInfo, 
  total, 
  taxes, 
  onClose, 
  onCheckout 
}) {
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/20 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <motion.div
        className="relative flex flex-col gap-[40px] p-[40px] shadow-adrians-horizontal-card w-[60vw] max-lg:w-[80vw] bg-white rounded-[40px]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      > 
        <button
        onClick={onClose}
        className="absolute cursor-pointer flex justify-center items-center w-[60px] h-[60px] p-[10px] -top-0 right-0 shadow-adrians-red hover:shadow-adrians-red-hover bg-adrians-red rounded-bl-[40px] rounded-tr-[40px] text-white hover:bg-adrians-red/80 transition-all duration-300 ease-in-out"
        >
          <IoClose className="text-[30px]" />
        </button>

        <h2 className="text-[36px] font-semibold text-adrians-red">Reservation Summary</h2>

        <div className="flex flex-col gap-[20px]">
          <p className="text-[18px] font-regular text-adrians-brown">
            <strong>Date:</strong> {selected?.toLocaleDateString()}
          </p>
          <p className="text-[18px] font-regular text-adrians-brown">
            <strong>Schedule:</strong> {selectedSchedule?.time}
          </p>
          <p className="text-[18px] font-regular text-adrians-brown">
            <strong>Adults:</strong> {adults} x ${tourInfo.adult_price}
          </p>
          <p className="text-[18px] font-regular text-adrians-brown">
            <strong>Children:</strong> {children} x ${tourInfo.child_price}
          </p>
        </div>

        <span className="w-full h-[2px] bg-adrians-red block rounded-full"></span>

        <div className="flex flex-col gap-[10px]">
          <p className="text-[18px] font-regular text-adrians-brown">
            Taxes: ${taxes.toFixed(2)}
          </p>
          <p className="text-[22px] font-semibold text-adrians-red">
            Total: ${total.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer text-[18px] font-regular underline text-adrians-red hover:font-medium transition-all duration-300 ease-in-out"
          >
            Edit
          </button>
          <button
            onClick={onCheckout}
            className="cursor-pointer text-[18px] font-semibold px-[20px] py-[10px] bg-adrians-red shadow-adrians-btn-shadow hover:shadow-adrians-btn-shadow-hover hover:scale-105 text-white rounded-full transition-all duration-300 ease-in-out"
          >
            Checkout
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
