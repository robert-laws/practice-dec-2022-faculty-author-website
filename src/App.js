import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Publications, NotFound } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/publications' element={<Publications />} />
        {/* <Route path='/publication/:id' element={<Publication />} />
        <Route path='/new' element={<NewEntry />} />
        <Route path='/about' element={<About />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
