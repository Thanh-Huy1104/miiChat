import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Voting({ name, location, totalVotes }) {
  const [userVote, setUserVote] = useState(null);  // Tracks user vote ('upvote' or 'downvote')
  const [currentVotes, setCurrentVotes] = useState(totalVotes);  // Manage total votes locally

  const handleVote = (type) => {
    if (userVote === type) {
      // Undo the vote
      setUserVote(null);
      setCurrentVotes((prev) => (type === "upvote" ? prev - 1 : prev + 1));
    } else {
      // Change vote
      if (userVote === "upvote") {
        setCurrentVotes((prev) => prev - 1);  // Remove previous upvote
      } else if (userVote === "downvote") {
        setCurrentVotes((prev) => prev + 1);  // Remove previous downvote
      }

      // Apply new vote
      setUserVote(type);
      setCurrentVotes((prev) => (type === "upvote" ? prev + 1 : prev - 1));
    }
  };

  // For demonstration, we'll assume max possible votes are 100
  const votePercentage = Math.max(0, Math.min(100, (currentVotes / 10) * 100));

  return (
    <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-lg w-72 border border-gray-300">
      {/* Image Placeholder */}
      <div className="bg-gray-200 h-40 rounded-lg mb-4"></div>

      {/* Title and Voting Buttons */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>

        {/* Voting Buttons */}
        <div className="flex flex-col space-y-2">
          {/* Upvote Button */}
          <button
            onClick={() => handleVote("upvote")}
            className={`p-2 rounded-full border transition ${
              userVote === "upvote" ? "bg-green-500 text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleVote("downvote")}
            className={`p-2 rounded-full border transition ${
              userVote === "downvote" ? "bg-red-500 text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-3 rounded-lg mt-4 border border-gray-300">
        <div className="relative h-3 bg-gray-300 rounded-full">
          <div
            className="absolute h-full bg-gray-800 rounded-full transition-all"
            style={{ width: `${votePercentage}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {votePercentage}% Upvotes
        </p>
      </div>
    </div>
  );
}
