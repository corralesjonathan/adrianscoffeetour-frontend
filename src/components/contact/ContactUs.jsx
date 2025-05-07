import { SectionTitle } from "../shared/SectionTitle";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook, FaTiktok, FaYoutube} from "react-icons/fa";

export function ContactUs() {
  return (
    <div className="flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px]">
      {/* Content */}
      <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
        <SectionTitle text="Contact Us" position={"items-start"} />
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="600"
          className="grid grid-cols-2 gap-[40px]
                max-lg:grid-cols-1
                "
        >
          {/* Phone */}
          <div className="flex gap-[16px] items-center">
            <img className="w-[30px]" src="./icons/phone.svg" alt="Phone" />
            <p className="text-[16px] font-regular text-adrians-brown">
              +506 8877 - 6655
            </p>
          </div>
          {/* Email */}
          <div className="flex gap-[16px] items-center">
            <img className="w-[30px]" src="./icons/email.svg" alt="Email" />
            <p className="text-[16px] font-regular text-adrians-brown">
              info@adrianscoffeetour.com
            </p>
          </div>
          {/* Location */}
          <div className="flex gap-[16px] items-center">
            <img
              className="w-[30px]"
              src="./icons/location.svg"
              alt="Location"
            />
            <p className="text-[16px] font-regular text-adrians-brown">
              San Ramón, Alajuela Costa Rica
            </p>
          </div>
          {/* Schedule */}
          <div className="flex gap-[16px] items-center">
            <img
              className="w-[30px]"
              src="./icons/schedule.svg"
              alt="Schedule"
            />
            <p className="text-[16px] font-regular text-adrians-brown">
              Monday to Sunday 9:30 AM to 5:00 PM
            </p>
          </div>
        </div>
        {/* Socials */}
        <div 
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
        data-aos-delay="600"
        className="w-full justify-start items-center flex gap-[10px]">
          <a href="https://www.instagram.com/adrianscoffeetour/">
            <RiInstagramFill
              className="text-white bg-adrians-red w-[40px] h-[40px] rounded-full p-[7px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out
                                "
            />
          </a>
          <a href="https://www.facebook.com/adrianscoffeetour">
            <FaFacebook
              className="text-white bg-adrians-red w-[40px] h-[40px] rounded-full p-[7px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out
                                "
            />
          </a>
          <a href="https://www.tiktok.com/@adrianscoffeetour">
            <FaTiktok
              className="text-white bg-adrians-red w-[40px] h-[40px] rounded-full p-[10px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out
                                "
            />
          </a>
          <a href="https://www.youtube.com/@adrianscoffeetour">
            <FaYoutube
              className="text-white bg-adrians-red w-[40px] h-[40px] rounded-full p-[7px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out
                                "
            />
          </a>
        </div>
      </div>

      {/* Location */}
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-duration="1000"
        data-aos-delay="800"
        className="w-[50%] flex items-center justify-center max-md:w-full"
      >
        <iframe
          className="w-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.8207370720056!2d-84.5808542249673!3d10.113755089997506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa047d9e2860bf9%3A0x523b69b33727bd61!2sAdrian&#39;s%20Coffee!5e0!3m2!1ses-419!2scr!4v1746599244288!5m2!1ses-419!2scr"
          height="500"
        ></iframe>
      </div>
    </div>
  );
}
