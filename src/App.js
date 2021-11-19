import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateNFT, Home, Dashboard } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <React.Fragment>
      <Router>
        <div>
          <Navbar />
          <div className="px-64 bg-gray-600 min-h-screen">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreateNFT />} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
