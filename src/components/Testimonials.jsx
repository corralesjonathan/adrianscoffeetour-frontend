import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import testimonials from "../data/testimonials.js";

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                <SectionTitle
                    text="What Our Visitors Are Saying"
                    position={"items-start"}
                />
                <p
                    className="text-[18px] font-regular text-adrians-brown"
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                >
                    From the aroma of freshly roasted beans to the warmth of our
                    farm, every visit is special. Discover what those who have
                    experienced it have to say.
                </p>
            </div>

            {/* Testimonials Slider */}
            <div className="flex flex-col items-end w-[50%] gap-[40px] max-md:w-full">
                {/* Testimonial */}
                <div className="flex w-full h-fit">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="flex w-full h-fit justify-center flex-col gap-[20px] bg-adrians-beige rounded-[20px] p-[40px]
                            max-lg:h-[400px]"
                        >
                            <img
                                className="w-[40px]"
                                src="./icons/quote.svg"
                                alt="Quotation Marks"
                            />
                            <p className="text-[18px] font-regular text-adrians-brown">
                                {testimonials[currentIndex].description}
                            </p>
                            <p className="text-[16px] font-semibold text-adrians-red">
                                {testimonials[currentIndex].autor}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dots */}
                <div className="flex gap-[10px]">
                    {testimonials.map((_, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer transition-all duration-300 ease-in-out ${
                                index === currentIndex
                                    ? "w-[80px] h-[6px] bg-adrians-red rounded-full"
                                    : "w-[6px] h-[6px] bg-adrians-red/30 rounded-full hover:bg-adrians-red"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
