import React from "react";
import { Routes, Route } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

import Login from "./screens/Login/Login";
// import Editor from "./screens/Editor/Editor";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Login />} exact />
        {/* <Route path="/:id" element={<Editor />} exact /> */}
      </Routes>
    </>
  );
}

export default App;
