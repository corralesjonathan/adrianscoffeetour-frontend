import { useState, useEffect } from "react";
import { SectionTitle } from "../shared/SectionTitle.jsx";
import { Secondary_btn } from "../navigation/Secondary_btn.jsx";
import products from "../../data/products.js";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const product = products[currentIndex];

  return (
    <div 
      className="flex flex-col items-center w-[80vw] m-auto py-[40px] gap-[60px]
      max-sm:gap-[40px]
      max-lg:w-[90vw]
      ">
      <SectionTitle text="Discover The Flavors" position="items-center" />

      <div 
        className="flex w-full
        max-sm:flex-col max-sm:gap-[20px]
        "
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
        >
        <div 
          className="flex flex-col w-[50%] items-start justify-center p-[40px] gap-[60px] relative overflow-hidden
          max-sm:w-full max-sm:justify-start max-sm:gap-[40px] max-sm:p-[20px]
          ">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-[10px] absolute"
            >
              <h3 className="text-[32px] font-semibold text-adrians-red">
                {product.title}
              </h3>
              <p className="text-[18px] font-regular text-adrians-brown">
                {product.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div 
            className="flex gap-[20px] mt-[260px]
            max-sm:mt-[180px]
            ">
            <div
              onClick={prevSlide}
              className="cursor-pointer group flex items-center justify-center w-[40px] h-[40px] border-[2px] border-adrians-red rounded-full hover:bg-adrians-red transition-all duration-300 ease-in-out"
            >
              <ArrowLeft
                className="text-adrians-red group-hover:text-white transition-all duration-300 ease-in-out"
                strokeWidth={2}
              />
            </div>

            <div
              onClick={nextSlide}
              className="cursor-pointer group flex items-center justify-center w-[40px] h-[40px] border-[2px] border-adrians-red rounded-full hover:bg-adrians-red transition-all duration-300 ease-in-out"
            >
              <ArrowRight
                className="text-adrians-red group-hover:text-white transition-all duration-300 ease-in-out"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>

        <div 
          className="flex w-[50%] items-center justify-center overflow-hidden
          max-sm:w-full
          ">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.image}
              src={product.image}
              alt={product.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full h-auto max-w-[600px] object-contain
              max-sm:max-w-[400px]
              "
            />
          </AnimatePresence>
        </div>
      </div>

      <Secondary_btn text="View Products" link="/products" />
    </div>
  );
}
