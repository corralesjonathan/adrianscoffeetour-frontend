import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import {Home} from "./pages/Home.jsx";
import {Tour} from "./pages/Tour.jsx";
import {Checkout} from "./pages/Checkout.jsx";
import { UnderConstruction } from './pages/UnderConstruction.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
      </Routes>
    </Router>
  )
}

export default App
