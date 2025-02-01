import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Voting from "./Vote";
import CreateHotSpot from "./CreateHotSpot.tsx";


const hotspots = [
  { id: 1, name: "Central Park", location: "New York", totalVotes: 4 },
  { id: 2, name: "Golden Gate Bridge", location: "San Francisco", totalVotes: 7 },
  { id: 3, name: "Grand Canyon", location: "Arizona", totalVotes: 8 },
];

export default function HotspotList() {
    //modal for creating new hotspot
    const [modalIsOpen, setModalIsOpen] = useState(false)
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
      {hotspots.map((spot) => (
        <Voting
          key={spot.id}
          name={spot.name}
          location={spot.location}
          totalVotes={spot.totalVotes}
        />

      ))}

        <CreateHotSpot isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />

    </div>
  );
}

