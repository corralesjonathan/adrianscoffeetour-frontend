import { IoMdSend } from "react-icons/io";
import { SectionTitle } from "../shared/SectionTitle";

export function Newsletter() {
  return (
    <div className="flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px]">
      {/* Content */}
      <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
        <SectionTitle text="JOIN THE COFFEE FAMILY" position={"items-start"} />
        <p
          className="text-[18px] font-regular text-adrians-brown"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          Get exclusive updates, coffee tips, and special offers—straight to
          your inbox!
        </p>
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
