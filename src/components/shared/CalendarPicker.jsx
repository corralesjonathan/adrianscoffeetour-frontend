import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { motion } from "framer-motion";

export function CalendarPicker({ selected, setSelected, availableDates, showCalendar, setShowCalendar, calendarRef }) {
  const isDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today ||
      !availableDates.some(available =>
        available.toDateString() === date.toDateString()
      )
    );
  };

  if (!showCalendar) return null;

  return (
    <motion.div
      ref={calendarRef}
      className="absolute top-[100px] left-0 z-50 p-[20px] bg-white rounded-[20px] shadow-adrians-vertical-card"
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <DayPicker
        mode="single"
        captionLayout="dropdown"
        startMonth={new Date()}
        classNames={{
          today: "text-adrians-red",
          selected: "bg-adrians-red text-white rounded-full",
          day: "text-adrians-brown rounded-full hover:bg-adrians-red/5 hover:text-adrians-red transition-all duration-300 ease-in-out",
          caption_label: "hidden",
          dropdown: "cursor-pointer outline-none bg-adrians-red/5 rounded-full p-[5px] text-[16px] font-regular text-adrians-red",
          chevron: "fill-adrians-red hover:fill-adrians-red/70 transition-all duration-300 ease-in-out",
        }}
        selected={selected}
        onSelect={(date) => {
          setSelected(date);
          setShowCalendar(false);
        }}
        disabled={isDisabled}
        footer={
          <div className="flex justify-end">
            <button
              className="cursor-pointer px-[10px] py-[5px] font-medium bg-adrians-red text-white rounded-full
              hover:scale-105 transition-all duration-300 ease-in-out"
              onClick={() => setShowCalendar(false)}
            >
              Close
            </button>
          </div>
        }
      />
    </motion.div>
  );
}
