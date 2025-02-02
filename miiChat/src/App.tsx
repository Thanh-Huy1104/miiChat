import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BIGGGGBOOM from "./components/BIGGGGBOOM";
import GetStarted from "./components/GetStarted";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/BIGMAPBOOMER" element={<BIGGGGBOOM />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
