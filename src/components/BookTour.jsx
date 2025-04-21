import { Book_btn } from "./Book_btn"
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export function BookTour() {
    return (
        <div 
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-once="true"
        className="grid grid-cols-5 gap-[20px] absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80vw] h-fit p-[40px] rounded-[20px] bg-white shadow-adrians-horizontal-card
        max-sm:p-[20px] max-sm:grid-cols-1 max-sm:top-[120%]
        ">
            {/* Calendar */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/calendar.svg" alt="Calendar" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Date</h3>
                </div>
                <input className="w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light" type="text" placeholder="Choose a date" />
            </div>

            {/* Schedule */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/clock.svg" alt="Schedule" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Schedule</h3>
                </div>
                <input className="w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light" type="text" placeholder="Choose a schedule" />
            </div>

            {/* Adults */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/adults.svg" alt="Adults" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Adults</h3>
                </div>
                <input className="w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light text-center" type="number" value="2" />
            </div>

            {/* Children */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/children.svg" alt="Children" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Children</h3>
                    <button className="cursor-pointer">
                        <img className="element hover:scale-110 transition-all duration-300 ease-in-out" src="./icons/info.svg" alt="Info" />
                    </button>
                    <Tooltip  anchorSelect=".element" content="Children under 12 years old." place="bottom" />
                </div>
                <input className="w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light text-center" type="number" value="0" />
            </div>

            {/* Book Button */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <Book_btn text={"Book Now"} />
            </div>

        </div>
    )
}