import { SectionTitle } from "../shared/SectionTitle";
import { Link } from "react-router-dom";

export function Family () {
    return (
        <div className="flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px]">
              
              {/* Image */}
              <div
                data-aos="zoom-in"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-delay="800"
                className="w-[50%] flex items-center justify-center max-md:w-full"
              >
                <img
                  src="./imgs/family_2.webp"
                  alt="Family"
                  className="w-full h-[500px] object-cover rounded-[40px]"
                />
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
                <SectionTitle text="Meet The Family" position={"items-start"} />
                <p
                  className="text-[18px] font-regular text-adrians-brown"
                  data-aos="fade-up"
                  data-aos-once="true"
                  data-aos-duration="1000"
                  data-aos-delay="400"
                >
                  With over 40 years of experience, <span className="font-semibold text-adrians-red">Adrian Orozco</span> is more than a coffee grower — he’s a 
                  storyteller and guardian of his family’s coffee tradition. Raised among coffee plants, 
                  he has mastered the artisanal methods that define Costa Rican coffee.
                  <br />
                  <br />
                  Alongside his wife <span className="font-semibold text-adrians-red">Ana Rodríguez</span>, he welcomes visitors to their farm, guiding them through every step of the process with knowledge, warmth, and a true love for coffee.
                </p>
                
                {/* CTA Button */}
                <div
                  data-aos="fade-up"
                  data-aos-once="true"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                  className="flex gap-[16px]"
                >
                  <Link
                  to="/contact"
                  className="cursor-pointer flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full bg-adrians-red shadow-adrians-btn-shadow text-white
                    hover:shadow-adrians-btn-shadow-hover hover:scale-105
                    transition-all duration-300 ease-in-out
                  ">
                  Contact Us
                  </Link>
                  
                </div>

              </div>
            </div>
    )
}