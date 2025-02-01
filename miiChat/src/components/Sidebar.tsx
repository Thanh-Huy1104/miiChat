import { useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className={`fixed left-0 top-0 h-full w-64 bg-red-200 shadow-lg transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} p-4`}>
      <button onClick={toggleSidebar} className="absolute right-[-50px] top-4 bg-gray-800 text-white px-2">
        ☰
      </button>

      <nav className="mt-4">
        <button className="block w-full py-2 px-4 bg-gray-200 my-1" onClick={() => setActiveTab("login")}>Login</button>
        <button className="block w-full py-2 px-4 bg-gray-200 my-1" onClick={() => setActiveTab("spots")}>Upvoted Spots</button>
      </nav>

      <div className="mt-4">
        {activeTab === "login" && <div className="text-red-500"> Login Form Goes Here</div>}
        {activeTab === "spots" && <div>List of Upvoted Spots</div>}
      </div>
    </div>
  );
}