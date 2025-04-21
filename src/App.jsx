import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import {Home} from "./pages/Home.jsx";
import { UnderConstruction } from './pages/UnderConstruction.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/home" element={<Home />} />        
      </Routes>
    </Router>
  )
}

export default App
