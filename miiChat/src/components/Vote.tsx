import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import {
  downvoteHotspot,
  getHotspot,
  upvoteHotspot,
} from "../services/hotspot.service";

export default function Voting({ hotspot }) {
  const [userVote, setUserVote] = useState<string | null>(null); // Tracks user vote ('upvote' or 'downvote')
  const [currentVotes, setCurrentVotes] = useState(hotspot.numVotes); // Manage total votes locally

  useEffect(() => {
    const fetchNumVotes = async () => {
      const fetchHotspot = await getHotspot(hotspot.hotSpotID);
      setCurrentVotes(fetchHotspot.numVotes);
      console.log("New Votes:", fetchHotspot.numVotes);
    };

    fetchNumVotes();
    const interval = setInterval(fetchNumVotes, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleUpvote = () => {
    console.log(userVote);
    console.log(currentVotes);

    //type is upvote always

    // if userVote is not upvote and currentvotes is 5, do nothing
    if (userVote !== 'upvote' && currentVotes >= 5) {
      return
    }

    //if uservote is null, just do it
    if (!userVote) {
      setUserVote('upvote');
      upvoteHotspot(hotspot.hotSpotID);
      setCurrentVotes( (prevVotes: number) => { return prevVotes + 1 })
    }

    // if userVote is upvote, undo it
    if (userVote === 'upvote') {
      setUserVote(null);
      downvoteHotspot(hotspot.hotSpotID);
      setCurrentVotes((prevVotes: number) => { return prevVotes - 1 })
    }

    // if userVote is downvote, undo it and add a upvote
    if (userVote === 'downvote') {
      upvoteHotspot(hotspot.hotSpotID);
      upvoteHotspot(hotspot.hotSpotID);
      setUserVote('upvote');
      setCurrentVotes( (prevVotes: number) => { return prevVotes + 2})
    }
  };

  const handleDownvote = () => {
    console.log(userVote);
    console.log(currentVotes);

    //type is downvote always

    // if userVote is not downvote and currentvotes is 0, do nothing
    if (userVote !== 'downvote' && currentVotes <= 0) {
      return
    }

    if (!userVote) {
      setUserVote('downvote');
      downvoteHotspot(hotspot.hotSpotID);
      setCurrentVotes( (prevVotes: number) => { return prevVotes - 1 })
    }


    // if userVote is downvote, undo it
    if (userVote === 'downvote') {
      setUserVote(null);
      upvoteHotspot(hotspot.hotSpotID);
      setCurrentVotes((prevVotes: number) => { return prevVotes + 1 })
    }

    // if userVote is upvote, undo it and add a downvote
    if (userVote === 'upvote') {
      downvoteHotspot(hotspot.hotSpotID);
      downvoteHotspot(hotspot.hotSpotID);
      setUserVote('downvote');
      setCurrentVotes( (prevVotes: number) => { return prevVotes - 2})
    }
  };

  // For demonstration, we'll assume max possible votes are 100
  const votePercentage = Math.max(0, Math.min(100, (currentVotes / 5) * 100));

  return (
    <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-lg w-72 border border-gray-300">
      {/* Image Placeholder */}
      <div className="bg-gray-200 h-40 rounded-lg mb-4">
        <img
          src={hotspot.backgroundImg}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title and Voting Buttons */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">{hotspot.name}</h3>
          <p className="text-sm text-gray-500">{hotspot.address}</p>
        </div>

        {/* Voting Buttons */}
        <div className="flex flex-col space-y-2">
          {/* Upvote Button */}
          <button
            onClick={() => handleUpvote()}
            className={`w-10 h-10 p-2 items-center justify-center rounded-full border transition ${
              userVote === "upvote"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>

          {/* Downvote Button */}
          <button
            onClick={() => handleDownvote()}
            className={`w-10 h-10 p-2 rounded-full border transition ${
              userVote === "downvote"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-3 rounded-lg mt-4 border border-gray-300">
        {/* Outer container (gray, full width) */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full border border-gray-400 overflow-hidden">
          {/* Inner progress bar (red, dynamic width) */}
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentVotes / 5) * 100}%` }} // Convert to percentage
          ></div>
        </div>
        {/* Percentage Text */}
        <p className="text-center text-sm text-gray-600 mt-2">
          {votePercentage}% Upvotes
        </p>
      </div>
    </div>
  );
}
