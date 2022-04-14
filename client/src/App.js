import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home'
import Room from './screens/Room'

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/room/:id" element={<Room />} />
        <Route exact path="/" element={<Home />} />
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </div>
  );
};

export default App;
