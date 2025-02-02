import {
  faCheckToSlot,
  faGear,
  faLocationDot,
  faLocationPin,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Login from "./Login";
import HotspotList from "./HotSpotList";
import Avatar1 from "../assets/avatars/avatar1.png";
import Avatar2 from "../assets/avatars/avatar2.png";
import Avatar3 from "../assets/avatars/avatar3.png";
import Avatar4 from "../assets/avatars/avatar4.png";
import Avatar5 from "../assets/avatars/avatar5.png";
import Avatar6 from "../assets/avatars/avatar6.png";
import Avatar7 from "../assets/avatars/avatar7.png";
import Avatar8 from "../assets/avatars/avatar8.png";
import Avatar9 from "../assets/avatars/avatar9.png";
import Avatar10 from "../assets/avatars/avatar10.png";
import Avatar11 from "../assets/avatars/avatar11.png";
import Avatar12 from "../assets/avatars/avatar12.png";
import Avatar13 from "../assets/avatars/avatar13.png";
import Avatar14 from "../assets/avatars/avatar14.png";
import Avatar15 from "../assets/avatars/avatar15.png";
import Avatar16 from "../assets/avatars/avatar16.png";
import Avatar17 from "../assets/avatars/avatar17.png";
import Avatar18 from "../assets/avatars/avatar18.png";
import Avatar19 from "../assets/avatars/avatar19.png";
import Avatar20 from "../assets/avatars/avatar20.png";
import Avatar21 from "../assets/avatars/avatar21.png";
import Avatar22 from "../assets/avatars/avatar22.png";
import Avatar23 from "../assets/avatars/avatar23.png";
import Avatar24 from "../assets/avatars/avatar24.png";
import Avatar25 from "../assets/avatars/avatar25.png";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState("login");
  const { user } = useAuth();

  const avatars = [
    Avatar1,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar7,
    Avatar8,
    Avatar9,
    Avatar10,
    Avatar11,
    Avatar12,
    Avatar13,
    Avatar14,
    Avatar15,
    Avatar16,
    Avatar17,
    Avatar18,
    Avatar19,
    Avatar20,
    Avatar21,
    Avatar22,
    Avatar23,
    Avatar24,
    Avatar25,
  ];

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
          <FontAwesomeIcon icon={faGear} size="lg" color="#050505" />
        </button>
      </div>

      {/* Expandable Content Panel */}
      <div
        className={`flex-grow bg-[#F5F5F5] p-4 transition-opacity duration-300 overflow-y-auto scrollbar-thin ${
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {activeComponent === "login" && <Login />}
        {activeComponent === "hotspotList" && <HotspotList />}
      </div>
    </div>
  );
}
