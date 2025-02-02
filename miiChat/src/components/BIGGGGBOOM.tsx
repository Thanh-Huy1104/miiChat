import React from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";

const BIGGGGBOOM = () => {
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
};

export default BIGGGGBOOM;
