import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <MapComponent />
    </div>
  );
}