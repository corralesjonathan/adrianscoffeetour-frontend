import { useState, useEffect, useRef } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { BookTour } from "../shared/BookTour.jsx";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => setShowVideo(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    const handleClickOutside = (event) => {
      if (videoRef.current && !videoRef.current.contains(event.target)) {
        closeVideo();
      }
    };

    if (showVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVideo]);

  return (
    <>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-once="true"
        className="
          flex flex-col items-center justify-start gap-[20px] 
          w-[80vw] m-auto mt-[120px] px-[80px] py-[120px] 
          rounded-[40px] bg-[url('/imgs/hero.webp')] bg-cover bg-no-repeat bg-center 
          relative z-[2] h-fit
          max-xl:px-[40px] max-xl:w-[90vw]
          max-sm:px-[20px]
        "
      >
        {/* Content */}
        <div className="flex flex-col w-full gap-[20px]">
          <h1
            className="text-[96px] leading-[96px] text-white font-primary max-sm:text-[60px] max-sm:leading-[60px]"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Experience the <br /> Essence of Coffee
          </h1>

          <p
            className="text-[20px] text-white font-medium max-sm:text-[16px]"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Follow every step of the coffee journey, from the plantations to the
            perfect cup.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex gap-[20px] w-full max-sm:gap-[20px]"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <Link
            to="/tour"
            className="
              cursor-pointer w-fit bg-adrians-red text-white text-[18px] font-semibold 
              rounded-full px-[20px] py-[10px]
              hover:text-adrians-red hover:bg-white 
              transition-all duration-300 ease-in-out
              max-sm:text-[16px]
            "
          >
            Read More
          </Link>

          <button
            onClick={openVideo}
            className="
              group flex items-center gap-[10px] cursor-pointer text-white text-[18px] font-semibold 
              hover:text-adrians-red transition-all duration-300 ease-in-out
              max-sm:text-[16px]
            "
          >
            <FaRegCirclePlay className="text-[30px] max-sm:text-[24px] transition-all duration-300 ease-in-out" />
            Watch Video
          </button>
        </div>

        {/* Background overlay */}
        <div className="absolute inset-0 z-[-1] bg-black/20 rounded-[40px]" />

        {/* Book a Tour */}
        <BookTour />
      </div>

      {/* Modal Video Overlay with animation */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-[50] bg-black/90 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={closeVideo}
              className="absolute cursor-pointer -top-[-20px] -right-[-20px] p-[5px] bg-black/20 rounded-full text-white text-4xl font-bold
              hover:bg-black/50
              transition-all duration-300 ease-in-out
              "
            >
              <IoClose className="text-[30px]" />
            </button>

            <motion.div
              ref={videoRef}
              className="relative w-[90%] max-w-5xl aspect-video"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/BZCbAXwvol4?autoplay=1&start=6"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
