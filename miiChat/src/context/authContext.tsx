import { createContext, useState, useContext } from "react";
import { IUser } from "../services/user.service";

// Define the AuthContext type
interface AuthContextType {
  user: IUser | null;
  setUserData: (user: IUser | null) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  setUserData: () => {},
});

// Custom hook for using AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider to wrap the entire app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const setUserData = (user: IUser | null) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
