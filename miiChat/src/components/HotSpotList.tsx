import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Voting from "./Vote";

const hotspots = [
  { id: 1, name: "Central Park", location: "New York", totalVotes: 4 },
  { id: 2, name: "Golden Gate Bridge", location: "San Francisco", totalVotes: 7 },
  { id: 3, name: "Grand Canyon", location: "Arizona", totalVotes: 8 },
];

export default function HotspotList() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {/* Plus Button Styled Like Voting Cards */}
      <button
        className="flex items-center justify-center bg-white text-gray-700 p-4 rounded-2xl shadow-lg w-72 h-20 border border-gray-300 hover:bg-gray-100 transition"
        onClick={() => alert('Add new hotspot!')}
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
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
    </div>
  );
}

