import { SectionTitle } from "../shared/SectionTitle";
export function Form() {
  return (
    <div
      className="
            flex flex-col justify-center items-center gap-[60px] 
            w-[80vw] m-auto py-[40px]
            max-xl:w-[90vw]
            max-sm:gap-[40px]
            "
    >
      {/* Title */}
      <SectionTitle text="Get In Touch" position="items-center" />

      {/* Form */}
      <form
       data-aos="fade-up"
       data-aos-once="true"
       data-aos-duration="1000"
       className="flex flex-col gap-[20px] w-[60vw]
                max-xl:w-[90vw]" 
       action="">
        <input
          className="w-full outline-none px-[20px] py-[10px] border-[0.5px] border-adrians-brown rounded-full"
          type="text"
          placeholder="Name"
          name=""
          id=""
        />
        <input
          className="w-full outline-none px-[20px] py-[10px] border-[0.5px] border-adrians-brown rounded-full"
          type="email"
          placeholder="Email"
          name=""
          id=""
        />
        <textarea
          className="w-full outline-none px-[20px] py-[10px] border-[0.5px] border-adrians-brown rounded-[20px]"
          placeholder="Message"
          cols="30"
          rows="6"
          name=""
          id=""
        />
        <button
          type="submit"
          className="cursor-pointer w-fit flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full bg-adrians-red shadow-adrians-btn-shadow text-white
                    hover:shadow-adrians-btn-shadow-hover hover:scale-105
                    transition-all duration-300 ease-in-out
                  "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
