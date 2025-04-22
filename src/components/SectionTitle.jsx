export function SectionTitle( {text, position} ) {
    return (
        <>
            {/* Title */}
            <div className={`flex flex-col ${position}`}>
                <h1
                className="text-[40px] font-primary font-regular text-adrians-brown"
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
                >
                {text}
                </h1>
                <span
                className="w-[160px] h-[3px] bg-adrians-red block rounded-full"
                data-aos="fade-up"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-delay="200"
                ></span>
            </div>
        </>
    )
}