import React from "react";
import { Routes, Route } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

import Login from "./screens/Login/Login";
// import Editor from "./screens/Editor/Editor";

const App: React.FC = () => {
  return (
    <>
      <ReactNotifications />
      <Routes>
        {/* <Route path="/:id" element={<Editor />} /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
