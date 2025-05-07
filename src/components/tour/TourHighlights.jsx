import { SectionTitle } from "../shared/SectionTitle";
import features from "../../data/features";

export function TourHighlights() {
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
          <SectionTitle text="Tour Highlights" position="items-center" />
    
          {/* Features */}
          <div
            className="
              grid grid-cols-3 gap-[40px]
              max-lg:grid-cols-2
              max-sm:grid-cols-1
            "
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="
                  bg-white w-full rounded-[20px] shadow-adrians-vertical-card 
                  p-[20px]
                  flex flex-col items-start gap-[20px] relative
                "
                data-aos="zoom-in"
                data-aos-once="true"
                data-aos-duration="1000"
                data-aos-delay={index * 200}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-[280px] rounded-[20px] object-cover object-center"
                />

                <h3
                  className="text-[20px] font-semibold"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-[16px] font-light text-adrians-brown">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
}