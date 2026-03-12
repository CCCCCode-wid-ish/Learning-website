import React, { createContext, useState } from "react";
import { getCurrentUser, logoutUser } from "../../services/authService"; // Import from authService

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUser = getCurrentUser();
  const [role, setRole] = useState(initialUser ? initialUser.role : null);
  const [user, setUser] = useState(initialUser);

  // A manual login context injection for immediate UI updates
  const login = (userData) => {
    setRole(userData.role);
    setUser({ name: userData.username, email: userData.username, role: userData.role });
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    logoutUser();
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
