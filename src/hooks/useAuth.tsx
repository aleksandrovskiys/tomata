import { createContext, useContext } from "react";
import { User } from "../interafaces";
import { useUser } from "./useUser";

interface AuthContextProps {
  token: string | null;
  saveToken: (token: string | null) => void;

  user: User | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, loading, token, saveToken } = useUser();
  return (
    <AuthContext.Provider value={{ token, saveToken, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("useAuth must be used within an AuthProvider");
  return authContext;
};

export default AuthProvider;
