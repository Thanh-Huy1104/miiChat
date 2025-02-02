import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Voting from "./Vote";
import CreateHotSpot from "./CreateHotSpot.tsx";
import { getInactiveHotspots, IHotspot } from "../services/hotspot.service.ts";

// const hotspots = [
//   { id: 1, name: "Central Park", location: "New York", totalVotes: 4 },
//   {
//     id: 2,
//     name: "Golden Gate Bridge",
//     location: "San Francisco",
//     totalVotes: 7,
//   },
//   { id: 3, name: "Grand Canyon", location: "Arizona", totalVotes: 8 },
// ];

export default function HotspotList() {
  //modal for creating new hotspot
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inactiveHotspots, setInactiveHotspots] = useState<IHotspot[]>([]);

  useEffect(() => {
    const fetchHotspots = async () => {
      const hotspots = await getInactiveHotspots();
      console.log("Fetched Hotspots:", hotspots);
      setInactiveHotspots(hotspots);
    };

    fetchHotspots();
    const interval = setInterval(fetchHotspots, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2">
      {/* Plus Button Styled Like Voting Cards */}
      <button
        className="flex items-center justify-center bg-white text-gray-700 p-4 rounded-2xl shadow-lg w-full h-16 border border-gray-300 hover:bg-gray-100 transition"
        onClick={() => setModalIsOpen(true)}
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
          <FontAwesomeIcon icon={faPlus} className="text-2xl" />
        </div>
      </button>

      {/* Render Voting Cards */}
      {inactiveHotspots.map((spot) => (
        <Voting hotspot={spot} key={spot.hotSpotID} />
      ))}

      <CreateHotSpot
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </div>
  );
}
