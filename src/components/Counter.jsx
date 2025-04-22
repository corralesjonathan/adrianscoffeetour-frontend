import { useState, useEffect, useRef } from 'react'
import highlights from "../data/highlights"

export function Counter() {
  const [counts, setCounts] = useState(highlights.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.5,
      }
    )

    if (counterRef.current) observer.observe(counterRef.current)

    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      highlights.forEach((highlight, index) => {
        let currentCount = 0
        const target = highlight.number

        const counter = () => {
          if (currentCount < target) {
            currentCount += Math.ceil(target / 200)
            setCounts((prevCounts) => {
              const newCounts = [...prevCounts]
              newCounts[index] = currentCount
              return newCounts
            })
            requestAnimationFrame(counter)
          } else {
            setCounts((prevCounts) => {
              const newCounts = [...prevCounts]
              newCounts[index] = target
              return newCounts
            })
          }
        }

        counter()
      })
    }
  }, [isVisible])

  return (
    <div
      ref={counterRef}
      data-aos="zoom-in"
      data-aos-duration="1000"
      data-aos-once="true"
      data-aos-delay="100"
      className="grid grid-cols-3 w-[80vw] m-auto bg-adrians-red rounded-[20px] p-[40px] my-[40px]
      max-lg:p-[20px] max-lg:grid-cols-1 max-lg:my-[20px]
      max-xl:w-[90vw]
      "
    >
      {highlights.map((highlight, index) => (
        <div
          key={index}
          className="flex flex-col w-full items-center justify-center"
        >
          <h1 
            className="text-[64px] font-semibold text-white
            max-lg:text-[48px]
            ">
            +{counts[index]}
          </h1>
          <p 
            className="text-[18px] h-[60px] text-center font-regular text-white
            max-lg:text-[16px]
            ">
            {highlight.description}
          </p>
        </div>
      ))}
    </div>
  )
}