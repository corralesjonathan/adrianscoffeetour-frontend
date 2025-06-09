import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { Home } from "./pages/Home.jsx";
import { Tour } from './pages/Tour.jsx';
import { About } from './pages/About.jsx';
import { Products } from './pages/Products.jsx';
import { Contact } from './pages/Contact.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { UnderConstruction } from './pages/UnderConstruction.jsx';
import { ScrollToTop } from './components/shared/ScrollToTop.jsx';
import { BackToTopButton } from './components/shared/BackToTopButton.jsx';
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { BookingProvider } from './context/BookingContext'

const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
  currency: "USD",
  intent: "capture",
};

AOS.init();
function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <BackToTopButton />
        <FloatingWhatsApp accountName='Adrians Coffee Tour' phoneNumber='50688624063' statusMessage='Typically replies within 30 minutes' chatMessage='Hello, how can we help?' allowEsc allowClickAway avatar='./icons/wa_profile.svg'/> 
        <Routes>
          <Route path="/under-construction" element={<UnderConstruction />} />
          <Route path="/" element={<Home />} />      
          <Route path="/tour" element={<Tour />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </BookingProvider>
  )
}

export default App
