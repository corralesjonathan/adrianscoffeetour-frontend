import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import {Home} from "./pages/Home.jsx";
import { UnderConstruction } from './pages/UnderConstruction.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/" element={<Home />} />        
      </Routes>
    </Router>
  )
}

export default App
