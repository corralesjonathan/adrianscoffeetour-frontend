export function Company () {
    return (
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-once="true"
          data-aos-delay="100"
          className="grid grid-cols-3 w-[80vw] m-auto p-[40px] my-[40px] gap-[40px]
          max-lg:p-[20px] max-lg:grid-cols-1 max-lg:my-[20px]
          max-xl:w-[90vw]
          "
        >
          <div className="flex flex-col items-center gap-[20px]">
            <img className="w-[100px]" src="./icons/vision.svg" alt="Vision" />
            <h4 className="text-[32px] font-bold font-primary text-adrians-red">Vision</h4>
            <p className="text-[16px] font-regular text-adrians-brown">To become a reference for artisanal coffee tourism, connecting people from around the world with the roots of coffee culture.</p>
          </div>

          <div className="flex flex-col items-center gap-[20px]">
            <img className="w-[100px]" src="./icons/mission.svg" alt="Mission" />
            <h4 className="text-[32px] font-bold font-primary text-adrians-red">Mission</h4>
            <p className="text-[16px] font-regular text-adrians-brown">To share the authentic Costa Rican coffee experience through education, sustainability, and family tradition.</p>
          </div>

          <div className="flex flex-col items-center gap-[20px]">
            <img className="w-[120px]" src="./icons/values.svg" alt="Values" />
            <h4 className="text-[32px] font-bold font-primary text-adrians-red">Values</h4>
            <p className="text-[16px] font-regular text-adrians-brown">We value authenticity, sustainability, family, passion, and hospitality—the essence of everything we do at Adrian’s Coffee Tour.</p>
          </div>
        </div>
      )
}