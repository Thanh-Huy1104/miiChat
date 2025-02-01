import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";
import Voting from "./Vote";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // Track selected component

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#F5F5F5] border-r border-gray-300 transition-all duration-300 z-50 flex ${
        isExpanded ? "w-96" : "w-16"
      } shadow-md`}
    >
      {/* Sidebar Icons (Fixed Column) */}
      <div className="flex flex-col items-center w-16 h-full bg-white border-r border-gray-300">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="my-4 text-gray-600 hover:text-gray-900 transition"
        >
          <FontAwesomeIcon icon={isExpanded ? faArrowLeft : faBars} size="lg" />
        </button>

        <button
          onClick={() => {
            setIsExpanded(true);
            setActiveComponent("login");
          }}
          className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition my-2"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </button>

        <button
          onClick={() => {
            setIsExpanded(true);
            setActiveComponent("voting");
          }}
          className="flex items-center justify-center w-12 h-12 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition my-2"
        >
          <FontAwesomeIcon icon={faStar} size="lg" />
        </button>
      </div>

      {/* Expandable Content Panel */}
      <div className={`flex-grow bg-[#F5F5F5] p-4 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {activeComponent === "login" && <Login />}
        {activeComponent === "voting" && <Voting />}
      </div>
    </div>
  );
}