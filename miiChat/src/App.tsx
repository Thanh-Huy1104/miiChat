import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded shadow-md z-40"
      >
        ☰ Open Sidebar
      </button>

      {/* Map Component (Lower z-index) */}
      <div className="relative z-10">
        <MapComponent />
      </div>
    </div>
  );
}