import { Link } from "react-router-dom";
export function Secondary_btn( {link, text} ) {
    return (
        <>
            <Link
                to={link}
                className="cursor-pointer flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-regular rounded-full border-adrians-red border-[1px] text-adrians-red
                hover:bg-adrians-red hover:text-white
                transition-all duration-300 ease-in-out">{text}
            </Link>
        </>
    );
}