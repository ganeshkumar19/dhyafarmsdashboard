import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Define the AuthContext type
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

// Create the AuthContext with proper type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRefreshToken = async () => {
      try {
        const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
      } catch (error) {
        console.error('Refresh token expired', error);
        const publicRoutes = ["/", "/farmpage", "/landing", '/reset'];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
  
    checkRefreshToken();
    // Run only on mount (empty dependency array)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
