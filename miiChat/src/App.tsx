import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import BIGGGGBOOM from "./components/BIGGGGBOOM";
import GetStarted from "./components/GetStarted";
import { AuthProvider } from "./context/authContext";

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
