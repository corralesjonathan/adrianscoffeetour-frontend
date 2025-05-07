export function PageTitle( {page, title, text} ) {
    return (
        <div 
            className="flex flex-col items-center justify-center text-center w-[80vw] m-auto py-[40px] mt-[120px]
            max-xl:w-[90vw]
            ">
            <h3 
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
                className="text-[48px] font-bold font-primary text-adrians-red">
            {page}
            </h3>
            <h2 
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
                data-aos-delay="200"
                className="text-[84px] font-bold font-primary text-adrians-brown max-xl:text-[64px]">
                {title}
            </h2>
            <p
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-once="true"
                data-aos-delay="400" 
                className="text-[20px] font-regular text-adrians-brown">
                {text}
            </p>
        </div>
    )
}