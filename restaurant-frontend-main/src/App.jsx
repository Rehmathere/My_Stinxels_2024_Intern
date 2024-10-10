import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages File
import Home from "./Components/Home/home"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="bg-white">
          <Routes>
            {/* Home 1  */}
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
