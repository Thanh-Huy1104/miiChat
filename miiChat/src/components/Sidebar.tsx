import {
  faCheckToSlot,
  faGear,
  faLocationDot,
  faLocationPin,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import Login from "./Login";
import HotspotList from "./HotSpotList";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState("login"); // Default to Login
  const { user } = useAuth();

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-100 z-50 flex rounded-r-full ${
        isExpanded ? "w-96" : "w-16"
      }`}
    >
      {/* Sidebar Icons (Fixed Column) */}
      <div className="flex flex-col items-center w-16 h-full bg-white">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="my-4 text-gray-600 hover:text-gray-900 transition"
        >
          <FontAwesomeIcon
            icon={isExpanded ? faLocationPin : faLocationDot}
            size="lg"
            color="#050505"
          />
        </button>

        {/* Login Button (Always Active) */}
        <button
          onClick={() => {
            setIsExpanded(true);
            setActiveComponent("login");
          }}
          className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition my-2"
        >
          <FontAwesomeIcon icon={faUser} size="lg" color="#050505" />
        </button>

        {/* Voting Button (Disabled if not logged in) */}
        <button
          onClick={() => {
            if (user) {
              setIsExpanded(true);
              setActiveComponent("voting");
            }
            setIsExpanded(true);
            setActiveComponent("hotspotList");
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-lg transition my-2 ${
            user
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              : "text-gray-300 cursor-not-allowed opacity-50"
          }`}
          disabled={!user}
        >
          <FontAwesomeIcon icon={faCheckToSlot} size="lg" color="#050505" />
        </button>

        {/* Settings Button (Disabled if not logged in) */}
        <button
          onClick={() => {
            if (user) {
              setIsExpanded(true);
              setActiveComponent("settings");
            }
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-lg transition my-2 ${
            user
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              : "text-gray-300 cursor-not-allowed opacity-50"
          }`}
          disabled={!user}
        >
          <FontAwesomeIcon icon={faGear} size="lg"             color="#050505"
 />
        </button>
      </div>

      {/* Expandable Content Panel */}
      <div className={`flex-grow bg-[#F5F5F5] p-4 transition-opacity duration-300 overflow-y-auto scrollbar-thin ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {activeComponent === "login" && <Login />}
        {activeComponent === "hotspotList" && <HotspotList />}
      </div>
    </div>
  );
}
