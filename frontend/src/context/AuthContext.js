import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Configurer axios avec le token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setUser(res.data.user);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/api/auth/register", { name, email, password });
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être dans AuthProvider");
  return ctx;
};
