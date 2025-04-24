import { Book_btn } from "../navigation/Book_btn";
import { Tooltip } from "react-tooltip";
import { Plus_btn } from "../navigation/Plus_btn";
import { Minus_btn } from "../navigation/Minus_btn";
import { useState, useEffect, useRef } from "react";
import { CalendarPicker } from "./CalendarPicker.jsx";
import { motion, AnimatePresence } from "framer-motion";

const schedules = [
  { id: 1, time: "9:00 AM to 11:30 AM", unavailable: false },
  { id: 2, time: "1:00 PM to 3:30 PM", unavailable: false },
];

export function BookTour() {
  /** DayPicker */
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const dates = ["2025-04-22", "2025-04-23", "2025-04-24", "2025-04-25", "2025-04-26"];

  const availableDates = dates.map((dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (scheduleRef.current && !scheduleRef.current.contains(event.target)) {
        setOpenSchedule(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  /** Schedule */
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const scheduleRef = useRef(null);

  /** Adults & Children */
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [maxPeople, setMaxPeople] = useState(20);

  const handleIncrementAdults = () => {
    if (adults + children < maxPeople) {
      setAdults(adults + 1);
    }
  };

  const handleIncrementChildren = () => {
    if (adults + children < maxPeople) {
      setChildren(children + 1);
    }
  };

  const handleDecrementAdults = () => {
    if (adults > 2) {
      setAdults(adults - 1);
    }
  };

  const handleDecrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-once="true"
      className="
        absolute top-[85%] w-[90%] p-[40px] rounded-[20px] bg-white 
        shadow-adrians-horizontal-card grid grid-cols-5 gap-[20px] h-fit
        max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:w-[80vw] max-sm:p-[20px]
      "
    >
      {/* Calendar */}
      <div className="flex relative flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/calendar.svg" alt="Calendar" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Date</h3>
        </div>
        <input
          type="text"
          placeholder="Choose a date"
          readOnly
          onClick={() => setShowCalendar(!showCalendar)}
          value={
            selected
              ? selected.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""
          }
          className="
            cursor-pointer w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full 
            text-[14px] font-regular placeholder:font-regular placeholder:text-[14px] text-adrians-brown placeholder:text-adrians-brown
            hover:border-adrians-red
            outline-none
            transition-all duration-300 ease-in-out
          "
        />
        <AnimatePresence>
          <CalendarPicker
            selected={selected}
            setSelected={setSelected}
            availableDates={availableDates}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            calendarRef={calendarRef}
          />
        </AnimatePresence>
      </div>

      {/* Schedule */}
      <div className="flex flex-col gap-[20px] w-full justify-center items-center relative" ref={scheduleRef}>
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/clock.svg" alt="Schedule" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Schedule</h3>
        </div>

        {/* Input */}
        <div
          className="text-adrians-brown hover:border-adrians-red transition-all duration-300 ease-in-out cursor-pointer outline-none text-[14px] font-regular flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full"
          onClick={() => setOpenSchedule(!openSchedule)}
        >
          {selectedSchedule?.time || "Choose a schedule"}
          <svg
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${openSchedule ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Options */}
          <AnimatePresence>
            {openSchedule && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute p-[10px] top-[100px] left-0 w-full bg-white rounded-[10px] shadow-adrians-vertical-card z-10"
              >
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setOpenSchedule(false);
                    }}
                    className={`text-adrians-brown px-4 py-2 rounded-[10px] hover:bg-adrians-red/5 hover:text-adrians-red transition-all cursor-pointer ${
                      schedule.unavailable ? "text-gray-400 cursor-not-allowed" : ""
                    }`}
                  >
                    {schedule.time}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
      </div>

      {/* Adults */}
      <div className="flex flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/adults.svg" alt="Adults" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Adults</h3>
        </div>
        <div className="flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full transition-all duration-300 ease-in-out hover:border-adrians-red">
          <Minus_btn onclick={handleDecrementAdults} />
          <input
            type="number"
            value={adults}
            className="w-full text-center no-spinner outline-none text-[14px] font-regular placeholder:font-light placeholder:text-[14px] text-adrians-brown"
          />
          <Plus_btn onclick={handleIncrementAdults} />
        </div>
      </div>

      {/* Children */}
      <div className="flex flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/children.svg" alt="Children" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Children</h3>
          <button className="cursor-pointer">
            <img
              className="element hover:scale-110 transition-all duration-300 ease-in-out"
              src="./icons/info.svg"
              alt="Info"
            />
          </button>
          <Tooltip
            anchorSelect=".element"
            content="Children under 12 years old."
            place="bottom"
          />
        </div>
        <div className="flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full transition-all duration-300 ease-in-out hover:border-adrians-red">
          <Minus_btn onclick={handleDecrementChildren} />
          <input
            type="number"
            value={children}
            className="w-full text-center no-spinner outline-none text-[14px] font-regular placeholder:font-light placeholder:text-[14px] text-adrians-brown"
          />
          <Plus_btn onclick={handleIncrementChildren} />
        </div>
      </div>

      {/* Book Button */}
      <div
        className="flex w-full justify-center items-center max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px] max-xl:col-span-2 max-xl:mt-[20px]"
      >
        <Book_btn text={"Book Now"} />
      </div>
    </div>
  );
}
