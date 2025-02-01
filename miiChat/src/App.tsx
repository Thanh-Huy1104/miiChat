import MapComponent from "./components/MapComponent";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="relative">  
      {/* Sidebar */}
      <Sidebar />

      {/* Map Component */}
      <div className="relative z-10">
        <MapComponent />
      </div>
    </div>
  );
}
