import React from 'react';
import {BrowserRouter as  Router, Route,Routes} from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';

import Home from "./components/Home"
import AboutUs from "./components/AboutUs";
import ContactUs from './components/Contact';
import Error from './components/Error';



function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/About" element={<AboutUs />} />
        <Route path = "/ContactUs" element = {<ContactUs />} />
        <Route path = "*" element={<Error />} />
      </Routes>
      
    </Router>
  );
}

export default App;
