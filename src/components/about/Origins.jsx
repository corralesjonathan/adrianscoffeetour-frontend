import { SectionTitle } from "../shared/SectionTitle";

export function Origins() {
  return (
    <div className="flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px]">
      {/* Content */}
      <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
        <SectionTitle text="The Origins" position={"items-start"} />
        <p
          className="text-[18px] font-regular text-adrians-brown"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          The Orozco Rodríguez family has dedicated themselves to cultivating
          coffee in an artisanal way, driven by a deep love for the land.
        </p>
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="600"
          className="grid grid-cols-2 gap-[40px]
            max-lg:grid-cols-1
            "
        >
          {/* Coffee */}
          <div className="flex gap-[16px] items-center">
            <img className="w-[40px]" src="./icons/coffee.svg" alt="Coffee" />
            <p className="text-[16px] font-regular text-adrians-brown">
              Over 40 years of experience with coffee.
            </p>
          </div>
          {/* Earth */}
          <div className="flex gap-[16px] items-center">
            <img className="w-[40px]" src="./icons/earth.svg" alt="Earth" />
            <p className="text-[16px] font-regular text-adrians-brown">
              Visitors from more than 20 countries.
            </p>
          </div>
          {/* Family */}
          <div className="flex gap-[16px] items-center">
            <img className="w-[40px]" src="./icons/family.svg" alt="Family" />
            <p className="text-[16px] font-regular text-adrians-brown">
              Family-owned and operated with love.
            </p>
          </div>
          {/* Security */}
          <div className="flex gap-[16px] items-center">
            <img
              className="w-[40px]"
              src="./icons/security.svg"
              alt="Security"
            />
            <p className="text-[16px] font-regular text-adrians-brown">
              Committed to sustainability and authenticity
            </p>
          </div>
        </div>
      </div>

      {/* Image */}
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-duration="1000"
        data-aos-delay="800"
        className="w-[50%] flex items-center justify-center max-md:w-full"
      >
        <img
          src="./imgs/family.webp"
          alt="Family"
          className="w-full h-[500px] object-cover rounded-[40px]"
        />
      </div>
    </div>
  );
}
