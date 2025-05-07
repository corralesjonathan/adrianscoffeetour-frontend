import { SectionTitle } from "../shared/SectionTitle";
import { Book_btn } from "../navigation/Book_btn";
import features from "../../data/features";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Info() {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="flex w-[80vw] m-auto py-[40px] gap-[40px] max-xl:w-[90vw] max-md:flex-col max-sm:gap-[40px]">
      
      {/* Content */}
      <div className="flex flex-col gap-[40px] w-[50%] justify-center items-start max-md:w-full">
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
      <div className="w-[50%] flex items-center justify-center max-md:w-full relative">
        <div className="flex relative justify-center items-center w-[300px] h-[300px]">
          {features.map((feature, index) => {
            const positions = [
              "top-[140px] right-0 z-10",
              "top-0 left-[-60px]",
              "top-[140px] left-[-20px]",
              "top-[-20px] right-[-60px]",
              "top-[0px] right-26",
              "top-[80px] left-10",
            ];
            const sizes = [
              "w-[140px]",
              "w-[200px]",
              "w-[120px]",
              "w-[240px]",
              "w-[120px]",
              "w-[180px]",
            ];

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`absolute cursor-pointer ${positions[index]}`}
              >
                {/* Tooltip animation */}
                <AnimatePresence>
                  {hoveredFeature === feature.id && (
                    <motion.div
                      key={`tooltip-${feature.id}`}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="relative flex flex-col bg-white p-[16px] rounded-[10px] w-[280px] gap-[8px] shadow-adrians-vertical-card">
                        <p style={{ color: feature.color }} className="text-adrians-brown font-bold text-[18px]">
                          {feature.title}
                        </p>
                        <p className="text-[16px] text-adrians-brown font-regular">{feature.description}</p>
                        {/* Flecha */}
                        <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Feature icon animation */}
                <motion.img
                  src={feature.icon}
                  alt={feature.alt}
                  className={`object-contain float-animation ${sizes[index]}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
