import { useState } from "react";
import { useAuth } from "../context/authContext";
import { createUser, IUser, loginUser } from "../services/user.service";

import Avatar1 from '../assets/avatars/avatar1.png';
import Avatar2 from '../assets/avatars/avatar2.png';
import Avatar3 from '../assets/avatars/avatar3.png';
import Avatar4 from '../assets/avatars/avatar4.png';
import Avatar5 from '../assets/avatars/avatar5.png';
import Avatar6 from '../assets/avatars/avatar6.png';
import Avatar7 from '../assets/avatars/avatar7.png';
import Avatar8 from '../assets/avatars/avatar8.png';
import Avatar9 from '../assets/avatars/avatar9.png';
import Avatar10 from '../assets/avatars/avatar10.png';
import Avatar11 from '../assets/avatars/avatar11.png';
import Avatar12 from '../assets/avatars/avatar12.png';
import Avatar13 from '../assets/avatars/avatar13.png';
import Avatar14 from '../assets/avatars/avatar14.png';
import Avatar15 from '../assets/avatars/avatar15.png';
import Avatar16 from '../assets/avatars/avatar16.png';
import Avatar17 from '../assets/avatars/avatar17.png';
import Avatar18 from '../assets/avatars/avatar18.png';
import Avatar19 from '../assets/avatars/avatar19.png';
import Avatar20 from '../assets/avatars/avatar20.png';
import Avatar21 from '../assets/avatars/avatar21.png';
import Avatar22 from '../assets/avatars/avatar22.png';
import Avatar23 from '../assets/avatars/avatar23.png';
import Avatar24 from '../assets/avatars/avatar24.png';
import Avatar25 from '../assets/avatars/avatar25.png';



export default function Login() {
  const { user, setUserData } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const avatars = [
    Avatar1, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar7, Avatar8, Avatar9, Avatar10,
    Avatar11, Avatar12, Avatar13, Avatar14, Avatar15, Avatar16, Avatar17, Avatar18, Avatar19, Avatar20,
    Avatar21, Avatar22, Avatar23, Avatar24, Avatar25,
];

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
        {isLoggingIn ? (
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        ) : (
          <h2 className="text-2xl font-bold text-gray-800">Register</h2>
        )}
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
          {!isLoggingIn ? (
            <div className="relative flex flex-col items-center">
              <p className="text-gray-600">Choose a Profile Picture:</p>
              <button
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className="mt-2 rounded-full border-4 border-gray-300 p-1"
              >
                <img
                  src={avatars[profileImg]}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </button>

              {/* Custom Popover */}
              {isPopoverOpen && (
                <div className="absolute w-[77%] top-20 bg-white shadow-lg rounded-lg items-center justify-center gap-2 border border-gray-200">
                  {avatars.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setProfileImg(index);
                        setIsPopoverOpen(false);
                      }}
                      className="focus:outline-none"
                    >
                      <img
                        src={image}
                        alt={`Avatar ${index + 1}`}
                        className="w-16 h-16 rounded-full border-2 border-transparent hover:border-black "
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

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
            onClick={isLoggingIn ? login : createNewUser}
            className="mt-4 w-full bg-[#050505] text-white p-2 rounded-lg hover:bg-gray-900"
          >
            {isLoggingIn ? "Login" : "Register"}
          </button>

          {/* Register Button */}
          <div className="flex items-center justify-center mt-2 w-full">
            {isLoggingIn ? (
              <p className="text-gray-600">Don't have an account?</p>
            ) : (
              <p className="text-gray-600">Already have an account?</p>
            )}
            <button
              onClick={() => setIsLoggingIn(!isLoggingIn)}
              className="text-gray-600 p-1 rounded-lg hover:bg-gray-200"
            >
              {!isLoggingIn ? "Login" : "Register"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
