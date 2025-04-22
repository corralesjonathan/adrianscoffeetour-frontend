import { Book_btn } from "./Book_btn";
import { Tooltip } from "react-tooltip";
import { Plus_btn } from "./Plus_btn";
import { Minus_btn } from "./Minus_btn";
import "react-tooltip/dist/react-tooltip.css";

export function BookTour() {
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
      <div className="flex flex-col gap-[20px] w-full justify-center items-center">
        <div className="flex gap-[10px] w-full items-center justify-start">
          <img src="./icons/calendar.svg" alt="Calendar" />
          <h3 className="text-[20px] font-semibold text-adrians-brown">Date</h3>
        </div>
        <input
          type="text"
          placeholder="Choose a date"
          className="
            w-full p-[10px] border-[0.5px] border-adrians-brown rounded-full 
            text-[14px] font-light placeholder:font-light placeholder:text-[14px] 
            outline-none
          "
        />
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
