import { useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className={`fixed left-0 top-0 h-full w-72 bg-white shadow-md transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={toggleSidebar} className="text-white text-xl">
          ✕
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="p-4">
        {/* Tabs */}
        <div className="space-y-2">
          <button
            className={`w-full py-2 text-left px-4 rounded ${
              activeTab === "login"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-full py-2 text-left px-4 rounded ${
              activeTab === "spots"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("spots")}
          >
            Upvoted Spots
          </button>
        </div>

        {/* Content Display */}
        <div className="mt-4">
          {activeTab === "login" && <div className="text-gray-600">Login Form Goes Here</div>}
          {activeTab === "spots" && <div className="text-gray-600">List of Upvoted Spots</div>}
        </div>
      </div>
    </div>
  );
}