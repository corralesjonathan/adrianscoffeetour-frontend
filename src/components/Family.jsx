import { Secondary_btn } from "./Secondary_btn.jsx";
import { SectionTitle } from "./SectionTitle.jsx";

export function Family() {
    return (
        <div
            className="
                flex w-[80vw] m-auto py-[40px] gap-[60px]
                max-xl:w-[90vw]
                max-md:flex-col
                max-sm:gap-[40px]
            "
        >
            {/* Image */}
            <img
                src="./imgs/family.webp"
                alt="Family"
                className="
                    w-[50%] object-cover rounded-[40px]
                    max-md:w-full
                "
                data-aos="zoom-in"
                data-aos-once="true"
                data-aos-duration="1000"
            />

            {/* Content */}
            <div
                className="
                    flex flex-col gap-[40px] w-[50%]
                    justify-center items-start
                    max-md:w-full
                "
            >
                {/* Title */}
                <SectionTitle text="Our Family History" position={"items-start"}/>

                {/* Text */}
                <p
                    className="text-[18px] font-regular text-adrians-brown"
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-duration="1000"
                    data-aos-delay="400"
                >
                    The Orozco Rodríguez family has dedicated themselves to cultivating coffee in an artisanal way, driven by a deep love for the land. 
                    <br /><br />
                    This passion led them to create Adrian’s Coffee Tour, where each stage of the process, from plantation to cup, reflects their commitment to quality and authenticity.
                </p>

                {/* CTA Button */}
                <Secondary_btn text="Read more" link="/about" />
            </div>
        </div>
    );
}
