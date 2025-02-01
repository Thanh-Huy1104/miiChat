import { useState } from "react";
import { useAuth } from "../context/authContext";
import Abdul from "../assets/avatars/abdul.png";
import AsianMom from "../assets/avatars/asian-mom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const { login, userID, logout } = useAuth();

  const profileImages = [Abdul, AsianMom, Abdul, AsianMom];

  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="w-72 p-4">
      {/* Login Title */}
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      </div>

      {userID ? (
        <>
          <p className="text-gray-600 text-center">You are logged in!</p>
          <button
            onClick={logout}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <div className="mt-4">
          {/* Profile Picture Selection */}
          <div className="relative flex flex-col items-center">
            <p className="text-gray-600">Choose a Profile Picture:</p>
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="mt-2 rounded-full border-4 border-gray-300 p-1"
            >
              <img
                src={selectedImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </button>

            {/* Custom Popover */}
            {isPopoverOpen && (
              <div className="absolute top-20 bg-white shadow-lg rounded-lg p-2 flex gap-2 border border-gray-200">
                {profileImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(image);
                      setIsPopoverOpen(false);
                    }}
                    className="focus:outline-none"
                  >
                    <img
                      src={image}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-transparent hover:border-black"
                    />
                  </button>
                ))}
              </div>
            )}
            
          </div>

          {/* Username and Password Fields */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mt-4 border rounded-lg focus:outline-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-lg focus:outline-black"
          />

          {/* Login Button */}
          <button
            onClick={login}
            className="mt-4 w-full bg-[#050505] text-white p-2 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>

          {/* Register Button */}
          <div className="flex items-center justify-center mt-2 w-full">
            <button className="mt-2 text-gray-600 p-2 rounded-lg hover:bg-gray-200">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
