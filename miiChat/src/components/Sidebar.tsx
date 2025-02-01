import {
  faLocationDot,
  faLocationPin,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Login from "./Login";
import Voting from "./Vote";
import { useAuth } from "../context/authContext";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState("login"); // Default to Login
  const { userID } = useAuth();

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-100 z-50 flex ${
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
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>

        {/* Voting Button (Disabled if not logged in) */}
        <button
          onClick={() => {
            if (userID) {
              setIsExpanded(true);
              setActiveComponent("voting");
            }
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-lg transition my-2 ${
            userID
              ? "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              : "text-gray-300 cursor-not-allowed opacity-50"
          }`}
          disabled={!userID}
        >
          <FontAwesomeIcon icon={faStar} size="lg" />
        </button>
      </div>

      {/* Expandable Content Panel */}
      <div
        className={`flex-grow bg-[#F5F5F5] p-4 transition-opacity duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {activeComponent === "login" && <Login />}
        {userID && activeComponent === "voting" && <Voting />}
      </div>
    </div>
  );
}