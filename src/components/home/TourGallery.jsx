import { SectionTitle } from "../shared/SectionTitle"

export function TourGallery() {
    return (
        <div 
            className="flex flex-col w-[80vw] m-auto gap-[60px] py-[40px]
            max-xl:w-[90vw]"
        >
            {/* Title */}
            <SectionTitle text="Coffee Tour Gallery" position="items-center" />

            {/* Gallery */}
            <div 
                className="grid grid-cols-3 gap-[20px]
                max-lg:grid-cols-2 max-sm:grid-cols-1"
            >

                <div
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                    data-aos-once="true" 
                    className="overflow-hidden w-full h-[600px] rounded-[20px]">
                    <img
                        src="./imgs/gallery_1.webp" 
                        alt="Tour 1" 
                        className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-105"
                    />
                </div>

                <div className="grid grid-rows-2 gap-[20px] h-[600px]">
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        data-aos-delay="200"  
                        className="overflow-hidden w-full h-full rounded-[20px]">
                        <img 
                            src="./imgs/gallery_2.webp" 
                            alt="Tour 2" 
                            className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        data-aos-delay="400" 
                        className="overflow-hidden w-full h-full rounded-[20px]">
                        <img 
                            src="./imgs/gallery_3.webp" 
                            alt="Tour 3" 
                            className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[20px] h-[600px] max-lg:col-span-2 max-sm:col-span-1">
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        data-aos-delay="600" 
                        className="overflow-hidden w-full h-[60%] rounded-[20px] max-lg:h-[50%]">
                        <img 
                            src="./imgs/gallery_4.webp" 
                            alt="Tour 4" 
                            className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        data-aos-delay="800" 
                        className="overflow-hidden w-full h-[40%] rounded-[20px] max-lg:h-[50%]">
                        <img 
                            src="./imgs/gallery_5.webp" 
                            alt="Tour 5" 
                            className="w-full h-full object-cover object-center transition-all duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
