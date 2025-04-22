import { Book_btn } from "./Book_btn"
import { Tooltip } from 'react-tooltip'
import { Plus_btn } from "./Plus_btn"
import { Minus_btn } from "./Minus_btn"
import 'react-tooltip/dist/react-tooltip.css'

export function BookTour() {
    return (
        <div 
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-once="true"
        className="grid grid-cols-5 gap-[20px] w-[90%] absolute top-[85%] h-fit p-[40px] rounded-[20px] bg-white shadow-adrians-horizontal-card
        max-sm:p-[20px] max-sm:grid-cols-1 max-sm:w-[80vw] max-xl:grid-cols-2
        ">
            {/* Calendar */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/calendar.svg" alt="Calendar" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Date</h3>
                </div>
                <input className="outline-none w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light" type="text" placeholder="Choose a date" />
            </div>

            {/* Schedule */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/clock.svg" alt="Schedule" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Schedule</h3>
                </div>
                <input className="outline-none w-full border-[0.5px] border-adrians-brown rounded-full p-[10px] text-[14px] font-light placeholder:text-[14px] placeholder:font-light" type="text" placeholder="Choose a schedule" />
            </div>

            {/* Adults */}
            <div className="flex flex-col gap-[20px] w-full justify-center items-center">
                <div className="flex gap-[10px] w-full items-center justify-start">
                    <img src="./icons/adults.svg" alt="Adults" />
                    <h3 className="text-[20px] font-semibold text-adrians-brown">Adults</h3>
                </div>
                <div className="flex items-center justify-between p-[10px] w-full border-[0.5px] border-adrians-brown rounded-full">
                    {/*  Minus */}
                    <Minus_btn onclick={""} />
                    <input className="outline-none w-full text-[14px] font-light placeholder:text-[14px] placeholder:font-light text-center no-spinner" type="number" value="2"/>
                    {/*  Plus */}
                    <Plus_btn onclick={""} />          
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
                    <Tooltip  anchorSelect=".element" content="Children under 12 years old." place="bottom" />
                </div>
                <div className="flex items-center justify-between p-[10px] w-full border-[0.5px] border-adrians-brown rounded-full">
                    {/*  Minus */}
                    <Minus_btn onclick={""} />
                    <input className="outline-none w-full text-[14px] font-light placeholder:text-[14px] placeholder:font-light text-center no-spinner" type="number" value="0"/>
                    {/*  Plus */}
                    <Plus_btn onclick={""} />          
                </div>
            </div>

            {/* Book Button */}
            <div className="flex w-full justify-center items-center
            max-sm:col-span-1 max-sm:mt-[20px] max-sm:mb-[20px] max-xl:col-span-2 max-xl:mt-[20px]
            ">
                <Book_btn text={"Book Now"} />
            </div>

        </div>
    )
}