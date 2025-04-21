import { useState, useEffect } from "react";

export function UnderConstruction() {
  // Set your target date (YYYY-MM-DDTHH:MM:SS)
  const targetDate = new Date("2025-06-01T00:00:00").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null; // Countdown finished
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[url('./imgs/hero.webp')] bg-center bg-cover"
    >
      <div className="flex items-center flex-col justify-center gap-8 bg-white/80 w-[40vw] max-sm:w-[90vw] h-[60vh] max-sm:h-fit p-10 rounded-4xl shadow-lg text-center">
        {/* Logo */}
        <img src="./imgs/logo.svg" alt="Adrian's Coffee Tour Logo" className="mx-auto w-[240px]" />

        {/* Message */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-adrians-brown">
            Our website is under construction
          </h1>
          <p className="text-[--color-adrians-brown] mt-2">
            Stay tuned! We’re working on something amazing.
          </p>
        </div>

        {/* Countdown Timer */}
        {timeLeft ? (
          <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-2">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center bg-adrians-red rounded-md p-4">
                <span className="text-3xl md:text-4xl font-bold text-white">{value}</span>
                <span className="text-sm uppercase text-white">{label}</span>
              </div>
            ))} 
          </div>
        ) : (
          <p className="text-xl font-bold text-adrians-red mt-4">Time's up!</p>
        )}

        {/* Footer */}
        <div className="flex h-full items-end">
          <p>© {new Date().getFullYear()} Adrian's Coffee Tour. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
