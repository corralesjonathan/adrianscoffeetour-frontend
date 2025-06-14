import { Link } from "react-router-dom";
export function Secondary_btn( {link, text} ) {
    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-delay="400"
            >
                <Link
                    to={link}
                    className="cursor-pointer flex w-fit justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-regular rounded-full border-adrians-red border-[1px] text-adrians-red
                    hover:bg-adrians-red hover:text-white
                    transition-all duration-300 ease-in-out">{text}
                </Link>
            </div>
        </>
    );
}