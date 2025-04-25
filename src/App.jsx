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

AOS.init();
function App() {
  return (
    <Router>
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
