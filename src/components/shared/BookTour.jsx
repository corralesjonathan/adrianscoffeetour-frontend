// Core imports
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import { Book_btn } from "../navigation/Book_btn";
import { Plus_btn } from "../navigation/Plus_btn";
import { Minus_btn } from "../navigation/Minus_btn";
import { CalendarPicker } from "./CalendarPicker.jsx";
import { Tooltip } from "react-tooltip";
import { BookingSummary } from "./BookingSummary";
import { Spinner } from "./Spinner";

// Custom hooks imports
import { useBookingData } from "../../hooks/useBookingData";
import { useBookingValidation } from "../../hooks/useBookingValidation";
import { useBookingCalculations } from "../../hooks/useBookingCalculations";
import { useBookingForm } from "../../hooks/useBookingForm";

export function BookTour() {
  // Initialize custom hooks
  const { tourInfo, availableDates, scheduleMapByDate, loading, error } = useBookingData();
  const { dateError, scheduleError, validateBooking, clearErrors } = useBookingValidation();
  const { formState, actions } = useBookingForm(tourInfo);

  // Handle date selection and automatically open schedule selector
  const handleDateSelection = (date) => {
    actions.handleDateSelect(date);
    actions.setShowCalendar(false);
    // Automatically open schedule selector after date is selected
    setTimeout(() => actions.setOpenSchedule(true), 100);
  };

  // Calculate total and taxes based on selected people
  const { total, taxes } = useBookingCalculations({
    adults: formState.adults,
    children: formState.children,
    adultPrice: tourInfo?.adult_price,
    childPrice: tourInfo?.child_price,
    taxRate: tourInfo?.tax
  });

  // Validate form and show booking summary
  const validateAndShowSummary = () => {
    const isValid = validateBooking({ 
      selected: formState.selected, 
      selectedSchedule: formState.selectedSchedule 
    });
    if (isValid) {
      actions.setShowSummary(true);
    }
  };

  // Loading and error states
  if (loading) return <Spinner />;
  if (error) return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/20 flex justify-center items-center">
      <div className="bg-white p-8 rounded-[20px] shadow-adrians-horizontal-card">
        <p className="text-adrians-red text-xl">Error: {error}</p>
      </div>
    </div>
  );

  // Get available schedules for selected date
  const selectedDateString = formState.selected ? formState.selected.toISOString().split("T")[0] : null;
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
            onClick={() => actions.setShowCalendar(!formState.showCalendar)}
            value={formState.selected ? formState.selected.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }) : ""}
            className="cursor-pointer w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full text-[14px] font-regular placeholder:text-adrians-brown text-adrians-brown hover:border-adrians-red outline-none transition-all duration-300 ease-in-out"
          />
          <AnimatePresence>
            <CalendarPicker
              selected={formState.selected}
              setSelected={handleDateSelection}
              availableDates={availableDates}
              showCalendar={formState.showCalendar}
              setShowCalendar={actions.setShowCalendar}
            />
          </AnimatePresence>
        </div>

        {/* Schedule Picker */}
        <div className="flex flex-col gap-[20px] w-full justify-center items-center relative">
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
            onClick={() => actions.setOpenSchedule(!formState.openSchedule)}
          >
            {formState.selectedSchedule?.time || "Choose a schedule"}
            <svg className={`w-4 h-4 ml-2 transition-transform duration-200 ${formState.openSchedule ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <AnimatePresence>
            {formState.openSchedule && (
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
                      onClick={() => {
                        actions.handleScheduleSelect(schedule);
                        clearErrors();
                      }}
                      className={`text-adrians-brown px-4 py-2 rounded-[10px] hover:bg-adrians-red/5 hover:text-adrians-red transition-all cursor-pointer ${
                        formState.selectedSchedule?.id === schedule.id ? "bg-adrians-red/5 text-adrians-red" : ""
                      }`}
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
            <Minus_btn onclick={actions.handleDecrementAdults} />
            <input type="number" value={formState.adults} readOnly className="w-full text-center no-spinner outline-none text-[14px] font-regular text-adrians-brown" />
            <Plus_btn onclick={actions.handleIncrementAdults} />
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
            <Minus_btn onclick={actions.handleDecrementChildren} />
            <input type="number" value={formState.children} readOnly className="w-full text-center no-spinner outline-none text-[14px] font-regular text-adrians-brown" />
            <Plus_btn onclick={actions.handleIncrementChildren} />
          </div>
        </div>

        {/* Book Button */}
        <div className="flex flex-col gap-[10px] w-full justify-center items-center max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px] max-xl:col-span-2 max-xl:mt-[20px]">
          <Book_btn text="Book Now" onClick={validateAndShowSummary} />
        </div>
      </div>

      {/* Booking Summary Modal */}
      <AnimatePresence>
        {formState.showSummary && (
          <BookingSummary
            selected={formState.selected}
            selectedSchedule={formState.selectedSchedule}
            adults={formState.adults}
            children={formState.children}
            tourInfo={tourInfo}
            total={total}
            taxes={taxes}
            onClose={() => actions.setShowSummary(false)}
            onCheckout={() => {
              actions.setShowSummary(false);
              actions.handleCheckout(total, taxes);
            }}
          />
        )}
      </AnimatePresence>

      <Tooltip
        id="book-tooltip"
        place="left"
        content="Book a tour"
        className="!bg-adrians-brown !text-white !px-[15px] !py-[8px] !rounded-[10px] !text-[14px] !font-regular"
      />
    </>
  );
}
