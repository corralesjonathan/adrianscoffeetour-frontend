import { IoMdSend } from "react-icons/io";
import { SectionTitle } from "./SectionTitle.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "./Spinner";
import { NewsletterSuccessModal } from "./NewsletterSuccessModal";


export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  /**
   * Handles the newsletter subscription
   * @param {Event} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !email.includes("@")) {
      setSubmitStatus({ success: false, message: "Please enter a valid email address" });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Common API configuration
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const headers = { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' };
      
      // POST request to subscribe to the newsletter
      const response = await axios.post(
        `${apiUrl}/newsletter`,
        { email },
        { headers }
      );
      
      setSubmitStatus({ 
        success: true, 
        message: "You've been successfully subscribed!"
      });
      
      // Clear the field after successful submission
      setEmail("");
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto close modal and clear message after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      // Error handling
      console.error("Newsletter subscription error:", error);
      
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || "Subscription failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {/* Loading spinner */}
      {isSubmitting && <Spinner />}
      
      {/* Success modal */}
      <NewsletterSuccessModal 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
      
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-once="true"  
        className="absolute w-[60%] top-0 translate-y-[-50%] rounded-[20px] justify-between items-center flex bg-white shadow-adrians-horizontal-card p-[40px] gap-[20px]
                  max-xl:flex-col max-lg:w-[80%]
                  "
      >
      {/* Text */}
      <div
        className="flex w-[50%] flex-col items-start gap-[40px]
                max-xl:w-full
                "
      >
        <SectionTitle text="Join The Coffee Family" position="items-start" />
        <p className="text-[18px] font-regular text-adrians-brown">
          Get exclusive updates, coffee tips, and special <br /> offers—straight
          to your inbox!
        </p>
      </div>

      {/* Form */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
        className="flex w-[50%] gap-[20px]
                max-xl:w-full
                "
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex py-[10px] pr-[10px] pl-[20px] w-full border-[1px] border-adrians-red rounded-full relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="outline-none w-full rounded-full"
              required
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              <IoMdSend
                className={`text-[40px] text-white ${isSubmitting ? 'bg-gray-400' : 'bg-adrians-red'} rounded-full p-[8px]
                                hover:scale-105
                                transition-all duration-300 ease-in-out`}
              />
            </button>
          </div>
          
          {/* Subscription status */}
          {submitStatus && (
            <div className={`mt-2 text-sm ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
}
