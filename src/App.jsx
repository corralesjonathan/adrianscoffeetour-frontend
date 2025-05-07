import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { Home } from "./pages/Home.jsx";
import { Tour } from './pages/Tour.jsx';
import { About } from './pages/About.jsx';
import { Products } from './pages/Products.jsx';
import { Contact } from './pages/Contact.jsx';
import { UnderConstruction } from './pages/UnderConstruction.jsx';
import { ScrollToTop } from './components/shared/ScrollToTop.jsx';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

AOS.init();
function App() {
  return (
    <Router>
      <ScrollToTop />
      <FloatingWhatsApp accountName='Adrians Coffee Tour' phoneNumber='50688624063' statusMessage='Typically replies within 30 minutes' chatMessage='Hello, how can we help?' allowEsc allowClickAway avatar='./icons/wa_profile.svg'/> 
      <Routes>
        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/" element={<Home />} />      
        <Route path="/tour" element={<Tour />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} /> 
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
