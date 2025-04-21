import { Minus } from "lucide-react";
export function Minus_btn( {onclick} ) {
    return (
        <>
                <span
                    onClick={onclick}
                    className="cursor-pointer group flex justify-center items-center border-adrians-red border-[1px] rounded-full w-[22px] h-[22px]
                    hover:bg-adrians-red
                    transition-all duration-300 ease-in-out
                    ">
                        <Minus 
                        className="text-adrians-red group-hover:text-white" size={16} strokeWidth={2}
                        transition-all duration-300 ease-in-out
                        />
                </span>
        </>
    );
}