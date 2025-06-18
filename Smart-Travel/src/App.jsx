import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Result';
import './index.css';
import Itinerary from './pages/Itinerary';

function App() {
  return (
     <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results" element={<Results />} />
                <Route path="/itinerary" element={<Itinerary />} />
            </Routes>
      </Router>
  );
}

export default App;