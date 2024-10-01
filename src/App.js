import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Komponenter
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import Navbar from './components/Navbar'; 

import CreateDocument from './components/CreateDocument';
import UpdateDocument  from './components/UpdateDocument';
import ReadDocument from './components/ReadDocument';

const App = () => {
  return (
    
    <Router>
      <div className="App">
      
        <Header />
        <Navbar />
        <Routes>
          <Route path="/home" element={<ReadDocument />} />
          <Route path="/document/:_id" element={<ReadDocument />} />
          <Route path="/update/:_id" element={<UpdateDocument />} />
          <Route path="/create" element={<CreateDocument />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
