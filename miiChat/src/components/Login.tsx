import { useEffect, useState } from "react";
import Abdul from "../assets/avatars/abdul.png";
import AsianMom from "../assets/avatars/asian-mom.png";
import { useAuth } from "../context/authContext";
import { createUser, IUser, loginUser } from "../services/user.service";

export default function Login() {
  const { user, setUserData } = useAuth();

  const profileImages = [Abdul, AsianMom, Abdul, AsianMom];

  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(0);

  const createNewUser = async () => {
    const newUser: IUser = await createUser({
      username: username,
      password: password,
      profileImg: profileImg,
    });
    console.log("Creating new user...");
    setUserData(newUser);
  };

  const login = async () => {
    const user: IUser = await loginUser({ username, password });
    console.log("Logging in...");
    setUserData(user);
  };
  
  const logout = () => {
    setUserData(null);
  };

  return (
    <div className="w-72 p-4">
      {/* Login Title */}
      <div className="flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      </div>

      {user ? (
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
                      setProfileImg(index);
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mt-4 border rounded-lg focus:outline-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            <button
              onClick={createNewUser}
              className="mt-2 text-gray-600 p-2 rounded-lg hover:bg-gray-200"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
