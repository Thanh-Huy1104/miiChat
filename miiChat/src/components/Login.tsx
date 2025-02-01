export default function Login() {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Login</h2>
        <p className="text-gray-600">Enter your credentials below:</p>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mt-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mt-2 border rounded-lg"
        />
        <button className="mt-4 w-full bg-gray-800 text-white p-2 rounded-lg">Login</button>
      </div>
    );
  }