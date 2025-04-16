import { FaRegCirclePlay } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Hero({ img }) {
  return (
    <div className="flex z-[2] relative w-[90vw] m-auto mt-[120px] px-[80px] rounded-[40px] bg-[url('/imgs/hero.webp')] bg-cover bg-no-repeat bg-center justify-center items-start flex-col gap-[20px] h-[600px]">
      {/* Content */}
      <h1 className="text-[96px] text-white font-primary leading-[96px]">Experience the <br/> Essence of Coffee</h1>
      <p className="text-[20px] text-white font-medium">Follow every step of the coffee journey, from the <br /> plantations to the perfect cup.</p>

      {/* CTA Buttons */}
      <div className="flex gap-[20px] w-full">
        <Link to={"/tour"} className="cursor-pointer bg-adrians-red text-white text-[18px] font-semibold rounded-full px-[20px] py-[10px]
          hover:text-adrians-red hover:bg-white transition-all duration-300 ease-in-out">
          Read More
        </Link>
        <button className="flex gap-[10px] items-center cursor-pointer text-white text-[18px] font-semibold
          hover:text-adrians-red transition-all duration-300 ease-in-out">
          <FaRegCirclePlay size={34} />
          Watch Video
        </button>
      </div>
      
      {/* Background overlay */}
      <div className="absolute inset-0 z-[-1] bg-black/20 rounded-[40px]"></div>
    </div>
  );
}
