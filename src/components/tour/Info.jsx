import { SectionTitle } from "../shared/SectionTitle";

export function Info() {
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
                           text="What to Expect"
                           position={"items-start"}
                       />
                       <p
                           className="text-[18px] font-regular text-adrians-brown"
                           data-aos="fade-up"
                           data-aos-once="true"
                           data-aos-duration="1000"
                           data-aos-delay="400"
                       >
                           Embark on an unforgettable journey through the world of coffee. At Adrian’s Coffee Tour, you’ll follow the entire coffee-making process—from the coffee plant to your cup. 
                           <br /> <br />
                           Guided by passionate experts, this immersive experience offers hands-on activities, scenic walks through our lush coffee farm, and a tasting session where you’ll savor a freshly brewed cup paired with a traditional snack. 
                       </p>
                   </div>

                   {/* Features */}
                   <div>
                    
                   </div>
        </div>
    )
}