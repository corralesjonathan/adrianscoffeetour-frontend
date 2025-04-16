import Aos from "aos";
import "aos/dist/aos.css";

export function Main_btn( {text, } ) {
    return (
        <>
            <button
                className="cursor-pointer flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full bg-adrians-red shadow-adrians-btn-shadow text-white
                hover:shadow-adrians-btn-shadow-hover hover:scale-105
                transition-all duration-300 ease-in-out">{text}
            </button>
        </>
    );
}