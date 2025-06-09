import { SectionTitle } from "../shared/SectionTitle";
import { useState, useRef, useEffect } from "react";

export function Video() {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);
  
  // Video URLs - one without autoplay and one with autoplay
  const videoUrlBase = "https://www.youtube.com/embed/BZCbAXwvol4";
  const videoUrlNoAutoplay = `${videoUrlBase}?start=0`;
  const videoUrlWithAutoplay = `${videoUrlBase}?autoplay=1&start=6`;
  
  useEffect(() => {
    // Create an Intersection Observer to detect when video is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When video becomes visible in the viewport
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        // Trigger when at least 40% of the element is in the viewport
        threshold: 0.4,
        // Add rootMargin for earlier detection
        rootMargin: "0px 0px 100px 0px"
      }
    );
    
    // Start observing the video container
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    // Clean up observer on unmount
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
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
      <SectionTitle text="Watch the Tour Experience" position="items-center" />

      {/* Video */}
      <div ref={videoRef} className="w-full">
        <iframe
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-once="true"
          className="w-full h-[720px] rounded-[20px]
          max-lg:h-[500px]"
          src={isVisible ? videoUrlWithAutoplay : videoUrlNoAutoplay}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
