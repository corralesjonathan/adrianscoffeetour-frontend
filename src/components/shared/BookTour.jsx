import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

import { Book_btn } from "../navigation/Book_btn";
import { Plus_btn } from "../navigation/Plus_btn";
import { Minus_btn } from "../navigation/Minus_btn";
import { CalendarPicker } from "./CalendarPicker.jsx";
import { Tooltip } from "react-tooltip";

export function BookTour() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const PRICE_PER_ADULT = 50;
  const PRICE_PER_CHILD = 45;

  // Data States
  const [data, setData] = useState([]);
  const [tourInfo, setTourInfo] = useState({});
  const [loading, setLoading] = useState(true);

  // UI States
  const [selected, setSelected] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [openSchedule, setOpenSchedule] = useState(false);
  const scheduleRef = useRef(null);

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);

  const [showSummary, setShowSummary] = useState(false);

  // Fetch available dates and tour info
  useEffect(() => {
    async function fetchData() {
      try {
        const [datesRes, tourRes] = await Promise.all([
          axios.get(`${apiUrl}/available-dates`, {
            headers: { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' }
          }),
          axios.get(`${apiUrl}/adrianscoffeetour`, {
            headers: { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' }
          })
        ]);

        setData(datesRes.data);
        setTourInfo(tourRes.data);
        setAdults(tourRes.data.min_adults);
        setChildren(tourRes.data.min_children);
        setMaxPeople(tourRes.data.max_people);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [apiUrl]);

  const availableDates = useMemo(() => {
    return [...new Set(data.map(item => item.date.date))].map(dateStr => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    });
  }, [data]);

  const scheduleMapByDate = useMemo(() => {
    const map = {};
    data.forEach(item => {
      const dateStr = item.date.date;
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push({ id: item.schedule.id, time: item.schedule.schedule });
    });
    return map;
  }, [data]);

  const selectedDateString = selected ? selected.toISOString().split("T")[0] : null;
  const filteredSchedules = selectedDateString ? scheduleMapByDate[selectedDateString] || [] : [];

  const totalPrice = useMemo(() => {
    return adults * PRICE_PER_ADULT + children * PRICE_PER_CHILD;
  }, [adults, children]);

  // Outside click to close calendar/schedule
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false);
      if (scheduleRef.current && !scheduleRef.current.contains(event.target)) setOpenSchedule(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Counter handlers
  const handleIncrementAdults = () => {
    if (adults + children < maxPeople) setAdults(adults + 1);
  };
  const handleIncrementChildren = () => {
    if (adults + children < maxPeople) setChildren(children + 1);
  };
  const handleDecrementAdults = () => {
    if (adults > tourInfo.min_adults) setAdults(adults - 1);
  };
  const handleDecrementChildren = () => {
    if (children > tourInfo.min_children) setChildren(children - 1);
  };

  if (loading) return <p>Loading data...</p>;

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
            className="cursor-pointer w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full text-[14px] font-regular placeholder:text-adrians-brown text-adrians-brown hover:border-adrians-red outline-none transition-all duration-300 ease-in-out"
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

        {/* Schedule Picker */}
        <div className="flex flex-col gap-[20px] w-full justify-center items-center relative" ref={scheduleRef}>
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
                      onClick={() => {
                        setSelectedSchedule(schedule);
                        setOpenSchedule(false);
                      }}
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
        <div className="flex w-full justify-center items-center max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px] max-xl:col-span-2 max-xl:mt-[20px]">
          <Book_btn text="Book Now" onClick={() => setShowSummary(true)} />
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
              className="absolute cursor-pointer -top-[-20px] -right-[-20px] p-[5px] bg-black/20 rounded-full text-white text-4xl font-bold
              hover:bg-black/50
              transition-all duration-300 ease-in-out"
            >
              <IoClose className="text-[30px]" />
            </button>

            <motion.div
              className="relative flex flex-col gap-[40px] p-[40px] shadow-adrians-horizontal-card w-[60vw] bg-white rounded-[40px] "
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-bold text-adrians-brown mb-4">Reservation Summary</h2>
              <p><strong>Date:</strong> {selected?.toLocaleDateString()}</p>
              <p><strong>Schedule:</strong> {selectedSchedule?.time}</p>
              <p><strong>Adults:</strong> {adults} x ${PRICE_PER_ADULT}</p>
              <p><strong>Children:</strong> {children} x ${PRICE_PER_CHILD}</p>
              <p className="mt-4 text-lg font-bold"><strong>Total:</strong> ${totalPrice}</p>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowSummary(false)}
                  className="bg-adrians-brown text-white px-4 py-2 rounded-full hover:bg-adrians-red transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowSummary(false);
                    console.log("Ir al checkout con datos...");
                  }}
                  className="bg-adrians-red text-white px-4 py-2 rounded-full hover:bg-adrians-brown transition-all"
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
