import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar, faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sidebar should expand on hover OR when clicked
  const sidebarExpanded = isExpanded || isHovered;

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-50 ${
        sidebarExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        {sidebarExpanded && <h2 className="text-lg font-semibold">Menu</h2>}
        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white text-xl">
          {isExpanded ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="mt-4 space-y-2">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200">
          <FontAwesomeIcon icon={faUser} />
          {sidebarExpanded && <span>Login</span>}
        </button>

        <button className="flex items-center gap-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200">
          <FontAwesomeIcon icon={faStar} />
          {sidebarExpanded && <span>Upvoted Spots</span>}
        </button>
      </div>
    </div>
  );
}