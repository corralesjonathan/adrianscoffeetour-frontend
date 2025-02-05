import { useState, useEffect, useRef } from "react";
import "../index.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export function BookTour() {
  const { data: tourData, loading: tourLoading, error, request: tourRequest } = useAxios();
  const { data: datesData, loading: datesLoading, request: datesRequest } = useAxios();

  const navigate = useNavigate();

  // API tours
  useEffect(() => {
    tourRequest("/adrianscoffeetour");
  }, [tourRequest]);

  // API dates
  useEffect(() => {
    datesRequest("/available-dates");
  }, [datesRequest]);

  // Flatpickr
  const inputRef = useRef(null);
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const minDate = d.toLocaleDateString("en-CA");

  useEffect(() => {
    const availableDates = datesData?.map((item) => item.date.date);
    flatpickr(inputRef.current, {
      mode: "single",
      enableTime: false,
      dateFormat: "Y-m-d",
      minDate: minDate,
      altInput: true,
      altFormat: "F j, Y",
      enable: availableDates,
      onChange: handleDateChange,
      onDayCreate: (dObj, dStr, fp, dayElem) => {
        const dayDate = dayElem.dateObj.toISOString().split("T")[0];
        if (availableDates.includes(dayDate)) {
          dayElem.classList.add("available-date");
        } else {
          dayElem.classList.add("unavailable-date");
        }
      },
    });
  }, [datesData]);

  const [dateId, setDateId] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [schedules, setSchedules] = useState([
    {
      id: "",
      schedule: "",
    },
  ]);
  const [adults, setAdults] = useState(tourData?.min_adults);
  const [children, setChildren] = useState(tourData?.min_children);
  const [alertMessage, setAlertMessage] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const pricePerAdult = parseFloat(tourData?.adult_price);
  const pricePerChild = parseFloat(tourData?.child_price);
  const taxRate = parseFloat(tourData?.tax) / 100;

  const minAdults = parseInt(tourData?.min_adults);
  const maxPeople = parseInt(tourData?.max_people);

  useEffect(() => {
    setAdults(tourData?.min_adults);
  }, [tourData?.min_adults]);

  useEffect(() => {
    setChildren(tourData?.min_children);
  }, [tourData?.min_children]);

  useEffect(() => {
    updateTotals();
  }, [adults, children]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!dateId || !scheduleId) {
      setAlertMessage("Please complete all fields.");
      return;
    }
  
    const checkoutData = {
      schedule_id: scheduleId,
      adults: adults,
      children: children,
      subtotal: subtotal.toFixed(2),
      taxes: taxes.toFixed(2),
      total: total.toFixed(2),
    };
  
    navigate("/checkout", { state: checkoutData });
  };

  const handleDateChange = (selectedDate) => {
    if (selectedDate === null) {
      return;
    }

    const date = selectedDate[0].toISOString().split("T")[0];
    console.log("Selected date:", date);

    // Filtrar todos los objetos que coincidan con la fecha seleccionada
    const selectedItems =
      datesData?.filter((item) => item.date.date === date) || [];

    setDateId(selectedItems[0]?.date.id);

    const schedules = selectedItems.map((item) => ({
      id: item.id,
      schedule: item.schedule.schedule,
    }));

    setSchedules(schedules);
  };

  const handleIncrementAdults = () => {
    if (adults + children < maxPeople) {
      setAdults(adults + 1);
    }
  };

  const handleDecrementAdults = () => {
    if (adults > minAdults) {
      setAdults(adults - 1);
    }
  };

  const handleIncrementChildren = () => {
    if (adults + children < maxPeople) {
      setChildren(children + 1);
    }
  };

  const handleDecrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };

  const updateTotals = () => {
    const subtotalAmount = adults * pricePerAdult + children * pricePerChild;
    const taxesAmount = subtotalAmount * taxRate;
    const totalAmount = subtotalAmount + taxesAmount;

    setSubtotal(subtotalAmount);
    setTaxes(taxesAmount);
    setTotal(totalAmount);
  };
  
  return (
    <>
      <section className="flex flex-col w-[90vw] items-center justify-center py-[40px] m-auto gap-[20px]">
        <h3 className="text-4xl max-sm:text-3xl font-light text-adrians-brown">
          Book a <span className="text-adrians-red font-semibold">tour</span>
        </h3>

        <form
          className="flex flex-col gap-[40px] rounded-[20px] w-full bg-white shadow-adrians-card-shadow p-[40px] max-sm:p-[20px] md:p-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 gap-[40px] max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Date */}
            <div className="flex flex-col w-full justify-between gap-[20px]">
              <div className="flex gap-[10px] w-full items-center">
                <img
                  className="w-[32px] h-[32px]"
                  src="/icons/calendar.svg"
                  alt=""
                />
                <p className="text-lg font-semibold text-adrians-brown">Date</p>
              </div>
              <input
                className="rounded-[10px] h-[60px] p-[10px] bg-white border-[0.5px] border-adrians-brown outline-none"
                ref={inputRef}
                type="text"
                value={dateId}
                placeholder="Select a date"
              />
            </div>

            {/* Schedule */}
            <div className="flex flex-col w-full justify-between gap-[20px]">
              <div className="flex gap-[10px] w-full items-center">
                <img
                  className="w-[32px] h-[32px]"
                  src="/icons/clock.svg"
                  alt=""
                />
                <p className="text-lg font-semibold text-adrians-brown">
                  Schedule
                </p>
              </div>

              <select
                value={scheduleId}
                onChange={(e) => setScheduleId(e.target.value)}
                required
                className="rounded-[10px] h-[60px] p-[10px] bg-white border-[0.5px] border-adrians-brown outline-none"
              >
                <option disabled selected value="">
                  Select a schedule
                </option>

                {schedules?.map((schedule) => (
                  <option key={schedule.id} value={schedule.id}>
                    {schedule.schedule}
                  </option>
                ))}
              </select>
            </div>

            {/* Adults */}
            <div className="flex flex-col w-full justify-between gap-[20px]">
              <div className="flex gap-[10px] w-full items-center">
                <img
                  className="w-[32px] h-[32px]"
                  src="/icons/adults.svg"
                  alt=""
                />
                <p className="text-lg font-semibold text-adrians-brown">
                  Adults
                </p>
              </div>
              <div className="flex h-[60px] items-center justify-between gap-[10px] border-[0.5px] border-adrians-brown rounded-[10px] p-[5px]">
                <button
                  type="button"
                  onClick={handleDecrementAdults}
                  className="text-adrians-brown font-bold text-[20px] p-[10px] hover:bg-adrians-red hover:text-white transition rounded-[5px]"
                >
                  -
                </button>
                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                  min={minAdults}
                  required
                  className="w-[50px] text-center outline-none text-adrians-brown font-semibold"
                />
                <button
                  type="button"
                  onClick={handleIncrementAdults}
                  className="text-adrians-brown font-bold text-[20px] p-[10px] hover:bg-adrians-red hover:text-white transition rounded-[5px]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex flex-col w-full justify-between gap-[20px]">
              <div className="flex gap-[10px] w-full items-center">
                <img
                  className="w-[32px] h-[32px]"
                  src="/icons/children.svg"
                  alt=""
                />
                <p className="text-lg font-semibold text-adrians-brown">
                  Children
                </p>
              </div>
              <div className="flex h-[60px] items-center justify-between gap-[10px] border-[0.5px] border-adrians-brown rounded-[10px] p-[5px]">
                <button
                  type="button"
                  onClick={handleDecrementChildren}
                  className="text-adrians-brown font-bold text-[20px] p-[10px] hover:bg-adrians-red hover:text-white transition rounded-[5px]"
                >
                  -
                </button>
                <input
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(parseInt(e.target.value))}
                  min={0}
                  required
                  className="w-[50px] text-center outline-none text-adrians-brown font-semibold"
                />
                <button
                  type="button"
                  onClick={handleIncrementChildren}
                  className="text-adrians-brown font-bold text-[20px] p-[10px] hover:bg-adrians-red hover:text-white transition rounded-[5px]"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col w-full gap-[10px]">
            <p className="text-sm font-light">
              Tour cost for adults:{" "}
              <span className="font-medium">${tourData?.adult_price}</span>
            </p>
            <p className="text-sm font-light">
              Tour cost for children:{" "}
              <span className="font-medium">${tourData?.child_price}</span>
            </p>
            <div className="h-[0.5px] w-full bg-adrians-brown"></div>
            <div className="flex flex-col gap-[10px] w-full items-start">
              <p className="text-sm font-light">
                Subtotal: ${subtotal.toFixed(2)}
              </p>
              <p className="text-sm font-light">
                Taxes (IVA {tourData?.tax}%): ${taxes.toFixed(2)}
              </p>
              <p className="text-base font-semibold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          {alertMessage && (
            <div className="alert">
              <p>{alertMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="font-semibold text-[18px] bg-adrians-red text-white rounded-[10px] p-[10px] hover:translate-y-[-5px] transition duration-500 ease-out"
          >
            {tourLoading ? "Redirecting to checkout…" : "Book now"}
          </button>
        </form>
      </section>

      {(tourLoading ||  datesLoading) && (
        <div className="fixed top-0 left-0 w-full h-full bg-white opacity-80 flex items-center justify-center z-50">
          <div className="loader"></div> 
        </div>
      )}
    </>
  );
}
