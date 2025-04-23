import { Book_btn } from "../navigation/Book_btn";
import { Tooltip } from "react-tooltip";
import { Plus_btn } from "../navigation/Plus_btn";
import { Minus_btn } from "../navigation/Minus_btn";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { CalendarPicker } from "./CalendarPicker.jsx";

import "react-tooltip/dist/react-tooltip.css";

export function BookTour() {
  
  /** DayPicker */
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const dates = ["2025-04-22", "2025-04-23", "2025-04-24", "2025-04-25", "2025-04-26"];

  const availableDates = dates.map(dateStr => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  });
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
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
          value={selected ? selected.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"}) : ""}
          className="
            w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full 
            text-[14px] font-light placeholder:font-light placeholder:text-[14px] 
            outline-none
          "
        />
          {/* Calendar Picker */}
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
      <div className="flex flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/clock.svg" alt="Schedule" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Schedule</h3>
        </div>
        <input
          type="text"
          placeholder="Choose a schedule"
          className="
            w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full 
            text-[14px] font-light placeholder:font-light placeholder:text-[14px] 
            outline-none
          "
        />
      </div>

      {/* Adults */}
      <div className="flex flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/adults.svg" alt="Adults" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Adults</h3>
        </div>
        <div className="flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full">
          <Minus_btn onclick={""} />
          <input
            type="number"
            value="2"
            className="
              w-full text-center no-spinner outline-none text-[14px] font-light 
              placeholder:font-light placeholder:text-[14px]
            "
          />
          <Plus_btn onclick={""} />
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
        <div className="flex items-center justify-between w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full">
          <Minus_btn onclick={""} />
          <input
            type="number"
            value="0"
            className="
              w-full text-center no-spinner outline-none text-[14px] font-light 
              placeholder:font-light placeholder:text-[14px]
            "
          />
          <Plus_btn onclick={""} />
        </div>
      </div>

      {/* Book Button */}
      <div
        className="
          flex w-full justify-center items-center
          max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px]
          max-xl:col-span-2 max-xl:mt-[20px]
        "
      >
        <Book_btn text={"Book Now"} />
      </div>

    </div>
  );
}
