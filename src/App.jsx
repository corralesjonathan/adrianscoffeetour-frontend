import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import {Home} from "./pages/Home.jsx";
import {Tour} from "./pages/Tour.jsx";
import {Checkout} from "./pages/Checkout.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  )
}

export default App
