import { SectionTitle } from "../shared/SectionTitle";
import { useState } from "react";
import axios from "axios";
import { Spinner } from "../shared/Spinner";
import { ContactSuccessModal } from "./ContactSuccessModal";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /**
   * Updates form data on input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when field is being edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Validates form data
   * @returns {boolean} - Whether form is valid
   */
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Common API configuration
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const headers = { 'X-API-KEY': '88db7914-fd68-460e-aa12-632ea62da18e' };
      
      // POST request to submit contact form
      const response = await axios.post(
        `${apiUrl}/contact`,
        formData,
        { headers }
      );
      
      setSubmitStatus({ 
        success: true, 
        message: "Your message has been sent successfully!"
      });
      
      // Clear the form after successful submission
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto close modal and clear message after 5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      // Error handling
      console.error("Contact form submission error:", error);
      
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || "Submission failed. Please try again."
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
      <ContactSuccessModal 
        show={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
      />
      
      <div
        className="
              flex flex-col justify-center items-center gap-[60px] 
              w-[80vw] m-auto py-[40px]
              max-xl:w-[90vw]
              max-sm:gap-[40px]
              "
      >
        {/* Title */}
        <SectionTitle text="Get In Touch" position="items-center" />

        {/* Form */}
        <form
          data-aos="fade-up"
          data-aos-once="true"
          data-aos-duration="1000"
          className="flex flex-col gap-[20px] w-[60vw]
                  max-xl:w-[90vw]" 
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              className={`w-full outline-none px-[20px] py-[10px] border-[0.5px] ${formErrors.name ? 'border-red-500' : 'border-adrians-brown'} rounded-full`}
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {formErrors.name && (
              <div className="text-red-500 text-xs mt-1 ml-4">{formErrors.name}</div>
            )}
          </div>
          
          <div className="relative">
            <input
              className={`w-full outline-none px-[20px] py-[10px] border-[0.5px] ${formErrors.email ? 'border-red-500' : 'border-adrians-brown'} rounded-full`}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {formErrors.email && (
              <div className="text-red-500 text-xs mt-1 ml-4">{formErrors.email}</div>
            )}
          </div>
          
          <div className="relative">
            <textarea
              className={`w-full outline-none px-[20px] py-[10px] border-[0.5px] ${formErrors.message ? 'border-red-500' : 'border-adrians-brown'} rounded-[20px]`}
              placeholder="Message"
              cols="30"
              rows="6"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {formErrors.message && (
              <div className="text-red-500 text-xs mt-1 ml-4">{formErrors.message}</div>
            )}
          </div>
          
          {/* Form submission status */}
          {submitStatus && (
            <div className={`text-sm ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`cursor-pointer w-fit flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full ${isSubmitting ? 'bg-gray-400' : 'bg-adrians-red'} shadow-adrians-btn-shadow text-white
                    hover:shadow-adrians-btn-shadow-hover hover:scale-105
                    transition-all duration-300 ease-in-out
                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                  `}
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}
