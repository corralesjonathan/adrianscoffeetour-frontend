import features from "../data/features.js";
import { Secondary_btn } from "./Secondary_btn.jsx";
import { SectionTitle } from "./SectionTitle.jsx";

export function Features() {
  return (
    <div
      className="
        flex flex-col justify-center items-center gap-[60px] 
        w-[80vw] m-auto mt-[120px] py-[40px]
        max-xl:w-[90vw] max-xl:mt-[300px]
        max-sm:gap-[40px] max-sm:mt-[540px]
      "
    >
      {/* Title */}
      <SectionTitle text="Discover Our Tour" position="items-center" />

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
              pt-[60px] pb-[40px] px-[20px] mt-[20px] 
              flex flex-col items-start gap-[20px] relative
            "
            data-aos="zoom-in"
            data-aos-once="true"
            data-aos-duration="1000"
            data-aos-delay={index * 200}
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="absolute top-0 left-0 -translate-y-12"
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

      {/* CTA Button */}
      <Secondary_btn text="See more" link="/tour" />
    </div>
  );
}
