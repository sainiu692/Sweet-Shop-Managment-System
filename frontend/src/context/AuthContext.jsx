import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (data) => {
    const response = await api.login(data);
    if (response.user) {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  const register = async (data) => {
    const response = await api.register(data);
    if (response.user) {
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user,
        isAdmin: user?.isAdmin || false,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
