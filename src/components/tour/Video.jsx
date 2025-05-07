import { SectionTitle } from "../shared/SectionTitle";
export function Video() {
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
      <iframe
        className="w-full h-[720px] rounded-[20px]
        max-lg:h-[500px]"
        src="https://www.youtube.com/embed/BZCbAXwvol4?autoplay=1&start=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
