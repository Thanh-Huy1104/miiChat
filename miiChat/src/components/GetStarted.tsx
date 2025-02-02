import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import hotspotAnimation from "../assets/animation/map.json"; // Replace with your Lottie animation file path
import loadingAnimation from "../assets/animation/loading.json"; // Replace with your Lottie loading animation file

const GetStarted = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true); // Show loading animation

    setTimeout(() => {
      navigate("/BIGMAPBOOMER"); // Navigate after 2 seconds
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      {/* Loading Animation */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <Lottie animationData={loadingAnimation} loop play className="w-[400px] h-[400px]" />
        </div>
      ) : (
        <>
          {/* Title */}
          <h1 className="text-5xl font-bold text-black mb-6">hotspot</h1>
          <h1 className="text-2xl font-light text-black mb-6 leading-relaxed">
            THE CHAT THAT MOVES WITH YOU
          </h1>

          {/* Lottie Animation */}
          <div className="w-[500px] h-[500px]">
            <Lottie animationData={hotspotAnimation} loop play />
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-black text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:bg-blue-600 hover:scale-110"
          >
            Get Started
          </button>
        </>
      )}
    </div>
  );
};

export default GetStarted;