import { createContext, useState, useContext } from "react";

// Define the AuthContext type
interface AuthContextType {
  userID: string;
  login: () => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  userID: "",
  login: () => {},
  logout: () => {},
});

// Custom hook for using AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider to wrap the entire app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userID, setUserID] = useState(""); // Null means not logged in

  // Function to log in a user (simulating login)
  const login = () => {
    setUserID("123456"); // Example user ID
  };

  // Function to log out a user
  const logout = () => {
    setUserID("");
  };

  return (
    <AuthContext.Provider value={{ userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}