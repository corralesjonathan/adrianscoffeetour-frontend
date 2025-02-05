import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import {Home} from "./pages/Home.jsx";
import {Tour} from "./pages/Tour.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
      </Routes>
    </Router>
  )
}

export default App
