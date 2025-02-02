import { useState } from "react";
import { useAuth } from "../context/authContext";
import { updateUser } from "../services/user.service";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuth(); // Ensure these functions are available in your auth context

  const handleUpdateUser = async () => {
    if (user) {
      const userData = {
        userID: user.userID,
      };

      // Dynamically adding properties
      if (username != "") {
        userData.username = username;
      }

      if (password != "") {
        userData.password = password;
      }

      try {
        const updatedUser = await updateUser(userData);
        console.log("User updated successfully:", updatedUser);
        alert("User updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      }
    }
  };

  return (
    <div className="w-72 p-4 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {user ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800">Update Account</h2>

            {/* Username Field */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Password Field */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Update Account Button */}
            <button
              onClick={() => handleUpdateUser()}
              className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-900 transition duration-300"
            >
              Update
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">No User Found</h2>
            <p className="text-gray-600 mt-2">
              Please log in to access your settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
