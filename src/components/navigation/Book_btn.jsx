
export function Book_btn( {text, onClick} ) {
    return (
        <>
            <button
                onClick={onClick}
                className="group cursor-pointer flex gap-[10px] w-fit justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full bg-adrians-red shadow-adrians-btn-shadow text-white
                hover:shadow-adrians-btn-shadow-hover hover:scale-105
                transition-all duration-300 ease-in-out">{text}

                <div className="flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full">
                    <img className="group-hover:translate-x-[2px] group-hover:rotate-[-45deg] transition-all duration-300 ease-in-out" src="./icons/arrow_right.svg" alt="Arrow" />
                </div>
            </button>
        </>
    );
}