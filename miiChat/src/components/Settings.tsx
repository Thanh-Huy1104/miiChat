import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Settings() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useAuth();
  
    return (
        <div className="w-72 p-4">
        {/* Login Title */}
        <div className="flex items-center justify-center">
        {user ? (
            <h2 className="text-2xl font-bold text-gray-800">Update Account</h2>
        ) : (
            <h2 className="text-2xl font-bold text-gray-800"></h2>
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
                <div className="absolute top-20 bg-white shadow-lg rounded-lg items-center justify-center gap-2 border border-gray-200">
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