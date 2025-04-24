import { IoMdSend } from "react-icons/io";
import { SectionTitle } from "../shared/SectionTitle.jsx";
export function Newsletter() {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-once="true"  
      className="absolute w-[60%] top-0 translate-y-[-50%] rounded-[20px] justify-between items-center flex bg-white shadow-adrians-horizontal-card p-[40px] gap-[20px]
                max-xl:flex-col max-lg:w-[80%]
                "
    >
      {/* Text */}
      <div
        className="flex w-[50%] flex-col items-start gap-[40px]
                max-xl:w-full
                "
      >
        <SectionTitle text="Join The Coffee Family" position="items-start" />
        <p className="text-[18px] font-regular text-adrians-brown">
          Get exclusive updates, coffee tips, and special <br /> offers—straight
          to your inbox!
        </p>
      </div>

      {/* Form */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        className="flex w-[50%] gap-[20px]
                max-xl:w-full
                "
      >
        <form className="w-full" action="">
          <div className="flex py-[10px] pr-[10px] pl-[20px] w-full border-[1px] border-adrians-red rounded-full">
            <input
              type="text"
              placeholder="Enter your email"
              className="outline-none w-full rounded-full"
            />
            <button type="submit" className="cursor-pointer">
              <IoMdSend
                className="text-[40px] text-white bg-adrians-red rounded-full p-[8px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
