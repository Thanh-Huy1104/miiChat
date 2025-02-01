import { useAuth } from "../context/authContext";

export default function Login() {
  const { login, userID, logout } = useAuth(); // Get login functions

  return (
    <div className="w-72 p-4">
      <h2 className="text-lg font-bold text-gray-800">Login</h2>
      {userID ? (
        <>
          <p className="text-gray-600">You are logged in!</p>
          <button
            onClick={logout}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded-lg"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-600">Enter your credentials below:</p>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mt-2 border rounded-lg focus:outline-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mt-2 border rounded-lg focus:outline-black"
          />
          <button
            onClick={login}
            className="mt-4 w-full bg-[#050505] text-white p-2 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}