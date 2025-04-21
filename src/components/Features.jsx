import features from "../data/features.js"
import { Link } from "react-router-dom"
import { Secondary_btn } from "./Secondary_btn.jsx"
export function Features() {
    return (
        <div 
        className="flex flex-col mt-[120px] py-[40px] w-[80vw] m-auto justify-center items-center gap-[60px]
        max-sm:mt-[420px] max-sm:w-[90vw]
        ">
            {/* Title */}
            <div className="flex flex-col items-center">
                <h1 className="text-[40px] font-primary font-regular text-adrians-brown">Discover Our Tour</h1>
                <span className="w-[160px] h-[3px] bg-adrians-red block rounded-full"></span>
            </div>

            {/* Features */}
            <div 
            className="grid grid-cols-3 gap-[40px]
            max-sm:grid-cols-1
            ">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-adrians-vertical-card rounded-[20px] mt-[20px] pt-[60px] pb-[20px] px-[20px] gap-[20px] flex relative flex-col items-start"
                    >
                        <img className="absolute top-0 left-0 -translate-y-12" src={feature.icon} alt={feature.title} />
                        <h3 style={{color: feature.color}} className="text-[20px] font-semibold">{feature.title}</h3>
                        <p className="text-[16px] font-light text-adrians-brown h-[60px]">{feature.description}</p>
                    </div>
                ))}
            </div>
            
           {/* CTA Button */}
           <Secondary_btn text="See more" link="/tour" />
        </div>
    )

}