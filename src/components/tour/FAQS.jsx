import { SectionTitle } from "../shared/SectionTitle";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import faqs from "../../data/faqs";

export function FAQS() {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(prevId => (prevId === id ? null : id));
  };

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
      <SectionTitle text="Frequently Asked Questions" position="items-center" />

      {/* Accordion */}
      <div className="w-full grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
        {faqs.map(({ id, question, answer }) => {
          const isOpen = openId === id;
          return (
            <div
              key={id}
              className="flex flex-col items-start gap-[10px] border-y-[1px] border-adrians-red py-[10px]"
            >
              {/* Header */}
              <div
                className="cursor-pointer flex items-center gap-[10px]"
                onClick={() => toggleAccordion(id)}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className=" text-adrians-red
                      transition-all duration-300 ease-in-out"
                  >
                    {isOpen ? (
                      <Minus size={24} strokeWidth={2} />
                    ) : (
                      <Plus size={24} strokeWidth={2} />
                    )}
                  </div>
                </motion.div>

                <p className="text-[18px] font-medium text-adrians-brown">
                  {question}
                </p>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[16px] font-light text-adrians-brown mt-[10px]">
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
