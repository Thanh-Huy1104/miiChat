import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";
import { AuthProvider } from "./context/authContext"

export default function App() {
  return (
    <AuthProvider>
      <div className="relative">
        {/* Sidebar */}
        <Sidebar />

        {/* Map Component */}
        <div className="relative z-10">
          <MapComponent />
        </div>
      </div>
    </AuthProvider>
  );
}