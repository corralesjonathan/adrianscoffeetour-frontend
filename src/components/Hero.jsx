import { FaRegCirclePlay } from "react-icons/fa6";
import { BookTour } from "./BookTour.jsx";
import { Link } from "react-router-dom";

export function Hero({ img }) {
  return (
    <div
      className="
        flex flex-col items-center justify-start gap-[20px] 
        w-[80vw] m-auto mt-[120px] px-[80px] py-[120px] 
        rounded-[40px] bg-[url('/imgs/hero.webp')] bg-cover bg-no-repeat bg-center 
        relative z-[2] h-fit
        max-xl:px-[40px] max-xl:w-[90vw]
        max-sm:px-[20px]
      "
    >
      {/* Content */}
      <div className="flex flex-col w-full gap-[20px]">
        <h1
          className="
            text-[96px] leading-[96px] text-white font-primary 
            max-sm:text-[60px] max-sm:leading-[60px]
          "
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Experience the <br /> Essence of Coffee
        </h1>

        <p
          className="
            text-[20px] text-white font-medium
            max-sm:text-[16px]
          "
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          Follow every step of the coffee journey, from the plantations to the perfect cup.
        </p>
      </div>

      {/* CTA Buttons */}
      <div
        className="
          flex gap-[20px] w-full
          max-sm:gap-[20px]
        "
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        {/* Read More */}
        <Link
          to="/tour"
          className="
            cursor-pointer w-fit bg-adrians-red text-white text-[18px] font-semibold 
            rounded-full px-[20px] py-[10px]
            hover:text-adrians-red hover:bg-white 
            transition-all duration-300 ease-in-out
            max-sm:text-[16px]
          "
        >
          Read More
        </Link>

        {/* Watch Video */}
        <button
          className="
            group flex items-center gap-[10px] cursor-pointer text-white text-[18px] font-semibold 
            hover:text-adrians-red transition-all duration-300 ease-in-out
            max-sm:text-[16px]
          "
        >
          <FaRegCirclePlay
            className="
              text-[30px] group-hover:text-[34px] 
              max-sm:text-[24px] max-sm:group-hover:text-[28px]
              transition-all duration-300 ease-in-out
            "
          />
          Watch Video
        </button>
      </div>

      {/* Background overlay */}
      <div className="absolute inset-0 z-[-1] bg-black/20 rounded-[40px]" />

      {/* Book a Tour */}
      <BookTour />
    </div>
  );
}
