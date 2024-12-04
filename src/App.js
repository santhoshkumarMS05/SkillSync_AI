import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
import Recommendations from './pages/Recommendations';
import CareerMap from './pages/CareerMap';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/career-map" element={<CareerMap />} /> {/* Add the CareerMap route */}
      </Routes>
    </Router>
    
  );
};

export default App;


