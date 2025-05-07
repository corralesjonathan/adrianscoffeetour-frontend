
export function Product( {title, description, color, reverse, justify, img} ) {
  return (
    <div className={` flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px] ${reverse} `}>
      {/* Content */}
      <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
        <div className="flex flex-col text-center items-start">
          <h1
            className="text-[40px] font-primary font-regular text-adrians-brown"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-duration="1000"
          >
            {title}
          </h1>
          <span
            style={{ backgroundColor: color }}
            className={`w-[160px] h-[3px] block rounded-full`}
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-duration="1000"
            data-aos-delay="200"
          ></span>
        </div>
        <p
          className="text-[18px] font-regular text-adrians-brown"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          {description}
        </p>
        <div
         data-aos="fade-up"
         data-aos-once="true"
         data-aos-duration="1000"
         data-aos-delay="600"
         className="flex flex-col gap-[20px]">
            <p style={{ color: color }} className="text-[18px] font-semibold">Whole Bean and Ground</p>
            <div className="flex gap-[10px]">
                <p style={{ backgroundColor: color }} className="px-[20px] py-[10px] text-[16px] font-semibold rounded-full text-white">250g</p>
                <p style={{ backgroundColor: color }} className="px-[20px] py-[10px] text-[16px] font-semibold rounded-full text-white">500g</p>
            </div>
        </div>
      </div>

      {/* Image */}
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-duration="1000"
        data-aos-delay="800"
        className={` w-[50%] flex items-center ${justify} max-md:justify-center max-md:w-full relative`}
      >
        <img
          src={img}
          alt="Product"
          className="w-[80%] max-w-[600px] object-cover"
        />
      </div>
    </div>
  );
}
