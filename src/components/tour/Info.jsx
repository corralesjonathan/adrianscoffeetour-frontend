import { SectionTitle } from "../shared/SectionTitle";
import { Book_btn } from "../navigation/Book_btn";
import features from "../../data/features";
export function Info() {
  return (
    <div
      className="
                       flex w-[80vw] m-auto py-[40px] gap-[40px]
                       max-xl:w-[90vw]
                       max-md:flex-col
                       max-sm:gap-[40px]
                   "
    >
      {/* Content */}
      <div
        className="
                           flex flex-col gap-[40px] w-[50%]
                           justify-center items-start
                           max-md:w-full
                       "
      >
        <SectionTitle text="What to Expect" position={"items-start"} />
        <p
          className="text-[18px] font-regular text-adrians-brown"
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          Embark on an unforgettable journey through the world of coffee. At
          Adrian’s Coffee Tour, you’ll follow the entire coffee-making
          process—from the coffee plant to your cup.
          <br /> <br />
          Guided by passionate experts, this immersive experience offers
          hands-on activities, scenic walks through our lush coffee farm, and a
          tasting session where you’ll savor a freshly brewed cup paired with a
          traditional snack.
        </p>
        <div
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <Book_btn text="Book Now" onClick={""} />
        </div>
      </div>

      {/* Features */}
      <div className="w-[50%] flex items-center justify-center">
        <div className="flex relative justify-center items-center w-[300px] h-[300px]">
            {features.map((feature, index) => (
            <img
                key={feature.id}
                src={feature.icon}
                alt={feature.alt}
                className={`
                    object-contain transition-transform
                    ${index === 0 ? "w-[120px] absolute top-[160px] right-8" : ""}
                    ${index === 1 ? "w-[200px] absolute top-0 left-[-60px]" : ""}
                    ${index === 2 ? "w-[120px] absolute top-[140px] left-[-20px]" : ""}
                    ${index === 3 ? "w-[240px] absolute top-0 right-[-60px]" : ""}
                    ${index === 4 ? "w-[120px] absolute top-[0px] right-26" : ""}
                    ${index === 5 ? "w-[180px] absolute top-[80px] left-10" : ""}
                `}
            />
            ))}
        </div>
      </div>
    </div>
  );
}
