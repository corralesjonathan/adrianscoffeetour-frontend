import { FaRegCirclePlay } from "react-icons/fa6";
import { BookTour } from "./BookTour.jsx";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

export function Hero({ img }) {
  return (
    <div className="
      flex z-[2] relative w-[90vw] m-auto mt-[100px] px-[80px] py-[120px] rounded-[40px] bg-[url('/imgs/hero.webp')] bg-cover bg-no-repeat bg-center justify-start items-start flex-col gap-[20px] h-[600px]
      max-sm:px-[20px] max-sm:py-[80px] max-sm:justify-start
      ">
      {/* Content */}
      <h1 
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        className="text-[96px] text-white font-primary leading-[96px]
        max-sm:text-[60px] max-sm:leading-[60px]
        ">Experience the <br/> Essence of Coffee
      </h1>
      <p
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-once="true"
        data-aos-duration="1000"
        className="text-[20px] text-white font-medium´
        max-sm:text-[16px]
        ">Follow every step of the coffee journey, from the plantations to the perfect cup.
      </p>

      {/* CTA Buttons */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        data-aos-once="true"
        data-aos-duration="1000"
        className="flex gap-[20px] w-full
        max-sm:gap-[20px]
        ">
        <Link to={"/tour"} className="cursor-pointer w-fit bg-adrians-red text-white text-[18px] font-semibold rounded-full px-[20px] py-[10px]
          hover:text-adrians-red hover:bg-white transition-all duration-300 ease-in-out
          max-sm:text-[16px]
          ">
          Read More
        </Link>
        <button className="group flex gap-[10px] items-center cursor-pointer text-white text-[18px] font-semibold
          hover:text-adrians-red transition-all duration-300 ease-in-out
          max-sm:text-[16px] 
          ">
          <FaRegCirclePlay className="text-[30px] group-hover:text-[34px]
          max-sm:text-[24px] max-sm:group-hover:text-[28px]
          transition-all duration-300 ease-in-out
          " />
          Watch Video
        </button>
      </div>
      
      {/* Background overlay */}
      <div className="absolute inset-0 z-[-1] bg-black/20 rounded-[40px]"></div>

      { /* Book a tour */}
      <BookTour />
    </div>
  );
}
