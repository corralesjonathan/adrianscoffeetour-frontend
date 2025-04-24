
import { Plus } from "lucide-react";
export function Plus_btn( {onclick} ) {
    return (
        <>
                <button
                    onClick={onclick}
                    className="cursor-pointer"
                    >
                        <Plus 
                        className="px-[2px] rounded-full text-adrians-red hover:bg-adrians-red hover:text-white
                        transition-all duration-300 ease-in-out" 
                        size={22} 
                        strokeWidth={2}
                        />
                </button>
        </>
    );
}