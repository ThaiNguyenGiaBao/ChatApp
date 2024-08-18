import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { useState } from "react";
import axios from "axios";
type User = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  gender: string;
};

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get("http://localhost:8000/auth/me");
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  });
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
