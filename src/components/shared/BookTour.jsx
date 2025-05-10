import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

import { Book_btn } from "../navigation/Book_btn";
import { Plus_btn } from "../navigation/Plus_btn";
import { Minus_btn } from "../navigation/Minus_btn";
import { CalendarPicker } from "./CalendarPicker.jsx";
import { Tooltip } from "react-tooltip";

import { useBookingData } from "../../hooks/useBookingData";
import { useBookingValidation } from "../../hooks/useBookingValidation";
import { useBookingCalculations } from "../../hooks/useBookingCalculations";

export function BookTour() {
  const navigate = useNavigate();
  
  // Custom hooks
  const { tourInfo, availableDates, scheduleMapByDate, loading, error } = useBookingData();
  const { dateError, scheduleError, validateBooking, clearErrors } = useBookingValidation();
  
  // UI States
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const scheduleRef = useRef(null);

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  // Initialize counters when tour info is loaded
  useEffect(() => {
    if (tourInfo) {
      setAdults(tourInfo.min_adults || 0);
      setChildren(tourInfo.min_children || 0);
    }
  }, [tourInfo]);

  // Price calculations
  const { total, taxes } = useBookingCalculations({
    adults,
    children,
    adultPrice: tourInfo.adult_price,
    childPrice: tourInfo.child_price,
    taxRate: tourInfo.tax
  });

  // Handle validation and summary display
  const validateAndShowSummary = () => {
    const isValid = validateBooking({ selected, selectedSchedule });
    if (isValid) {
      setShowSummary(true);
    }
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    const bookingData = {
      date: selected,
      schedule: selectedSchedule,
      adults,
      children,
      total,
      taxes
    };
    
    // Store booking data in sessionStorage for checkout
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    navigate('/checkout');
  };

  // Counter handlers with validation
  const handleIncrementAdults = () => {
    if (adults + children < tourInfo.max_people) {
      setAdults(prev => prev + 1);
    }
  };

  const handleIncrementChildren = () => {
    if (adults + children < tourInfo.max_people) {
      setChildren(prev => prev + 1);
    }
  };

  const handleDecrementAdults = () => {
    if (adults > tourInfo.min_adults) {
      setAdults(prev => prev - 1);
    }
  };

  const handleDecrementChildren = () => {
    if (children > tourInfo.min_children) {
      setChildren(prev => prev - 1);
    }
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelected(date);
    setSelectedSchedule(null); // Reset schedule when date changes
    clearErrors();
  };

  // Handle schedule selection
  const handleScheduleSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenSchedule(false);
    clearErrors();
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  const selectedDateString = selected ? selected.toISOString().split("T")[0] : null;
  const filteredSchedules = selectedDateString ? scheduleMapByDate[selectedDateString] || [] : [];

  return (
    <>
      {/* Booking Form */}
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-once="true"
        className="absolute top-[85%] w-[90%] p-[40px] rounded-[20px] bg-white shadow-adrians-horizontal-card grid grid-cols-5 gap-[20px] h-fit max-xl:grid-cols-2 max-sm:grid-cols-1 max-sm:w-[80vw] max-sm:p-[20px]"
      >
        {/* Date Picker */}
        <div className="flex relative flex-col gap-[20px] w-full justify-center items-center">
          {dateError && (
            <div className="absolute -bottom-[30px] left-0 w-full p-[5px]">
              <p className="text-[12px] text-adrians-red">{dateError}</p>
            </div>
          )}
          <div className="flex gap-[10px] w-full items-center justify-start">
            <img src="./icons/calendar.svg" alt="Calendar" />
            <h3 className="text-[20px] font-semibold text-adrians-brown">Date</h3>
          </div>
          <input
            type="text"
            placeholder="Choose a date"
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            value={selected ? selected.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }) : ""}
            className="cursor-pointer w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full text-[14px] font-regular placeholder:text-adrians-brown text-adrians-brown hover:border-adrians-red outline-none transition-all duration-300 ease-in-out"
          />
          <AnimatePresence>
            <CalendarPicker
              selected={selected}
              setSelected={handleDateSelect}
              availableDates={availableDates}
              showCalendar={showCalendar}
              setShowCalendar={setShowCalendar}
              calendarRef={calendarRef}
            />
          </AnimatePresence>
        </div>

        {/* Schedule Picker */}
        <div className="flex flex-col gap-[20px] w-full justify-center items-center relative" ref={scheduleRef}>
          {scheduleError && (
            <div className="absolute -bottom-[30px] left-0 w-full p-[5px]">
              <p className="text-[12px] text-adrians-red">{scheduleError}</p>
            </div>
          )}
          <div className="flex gap-[10px] w-full items-center justify-start">
            <img src="./icons/clock.svg" alt="Schedule" />
            <h3 className="text-[20px] font-semibold text-adrians-brown">Schedule</h3>
          </div>
          <div
            className="text-adrians-brown hover:border-adrians-red transition-all duration-300 ease-in-out cursor-pointer outline-none text-[14px] font-regular flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full"
            onClick={() => setOpenSchedule(!openSchedule)}
          >
            {selectedSchedule?.time || "Choose a schedule"}
            <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${openSchedule ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <AnimatePresence>
            {openSchedule && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute p-[10px] top-[100px] left-0 w-full bg-white rounded-[10px] shadow-adrians-vertical-card z-10"
              >
                {filteredSchedules.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">Select a date first</p>
                ) : (
                  filteredSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      onClick={() => handleScheduleSelect(schedule)}
                      className="text-adrians-brown px-4 py-2 rounded-[10px] hover:bg-adrians-red/5 hover:text-adrians-red transition-all cursor-pointer"
                    >
                      {schedule.time}
                    </div>
                  ))
                )}
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
            <input type="number" value={adults} readOnly className="w-full text-center no-spinner outline-none text-[14px] font-regular text-adrians-brown" />
            <Plus_btn onclick={handleIncrementAdults} />
          </div>
        </div>

        {/* Children */}
        <div className="flex flex-col gap-[20px] w-full justify-center items-center">
          <div className="flex gap-[10px] w-full items-center justify-start">
            <img src="./icons/children.svg" alt="Children" />
            <h3 className="text-[20px] font-semibold text-adrians-brown">Children</h3>
            <button className="cursor-pointer">
              <img className="element hover:scale-110 transition-all duration-300 ease-in-out" src="./icons/info.svg" alt="Info" />
            </button>
            <Tooltip anchorSelect=".element" content="Children under 12 years old." place="bottom" />
          </div>
          <div className="flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full transition-all duration-300 ease-in-out hover:border-adrians-red">
            <Minus_btn onclick={handleDecrementChildren} />
            <input type="number" value={children} readOnly className="w-full text-center no-spinner outline-none text-[14px] font-regular text-adrians-brown" />
            <Plus_btn onclick={handleIncrementChildren} />
          </div>
        </div>

        {/* Book Button */}
        <div className="flex flex-col gap-[10px] w-full justify-center items-center max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px] max-xl:col-span-2 max-xl:mt-[20px]">
          <Book_btn text="Book Now" onClick={validateAndShowSummary} />
        </div>
      </div>

      {/* Modal Summary Overlay with animation */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="fixed inset-0 z-[51] backdrop-blur-sm bg-black/20 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowSummary(false)}
              className="absolute cursor-pointer -top-[-20px] -right-[-20px] p-[5px] bg-black/20 rounded-full text-white
              hover:bg-black/50
              transition-all duration-300 ease-in-out"
            >
              <IoClose className="text-[30px]" />
            </button>

            <motion.div
              className="relative flex flex-col gap-[40px] p-[40px] shadow-adrians-horizontal-card w-[60vw] max-lg:w-[80vw] bg-white rounded-[40px] "
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-[36px] font-semibold text-adrians-red">Reservation Summary</h2>

              <div className="flex flex-col gap-[20px]">
                <p className="text-[18px] font-regular text-adrians-brown"><strong>Date:</strong> {selected?.toLocaleDateString()}</p>
                <p className="text-[18px] font-regular text-adrians-brown"><strong>Schedule:</strong> {selectedSchedule?.time}</p>
                <p className="text-[18px] font-regular text-adrians-brown"><strong>Adults:</strong> {adults} x ${tourInfo.adult_price}</p>
                <p className="text-[18px] font-regular text-adrians-brown"><strong>Children:</strong> {children} x ${tourInfo.child_price}</p>
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
                  onClick={() => setShowSummary(false)}
                  className="cursor-pointer text-[18px] font-regular underline text-adrians-red hover:font-medium transition-all duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowSummary(false);
                    handleCheckout();
                  }}
                  className="cursor-pointer text-[18px] font-semibold px-[20px] py-[10px] bg-adrians-red shadow-adrians-btn-shadow hover:shadow-adrians-btn-shadow-hover hover:scale-105 text-white rounded-full transition-all duration-300 ease-in-out"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
