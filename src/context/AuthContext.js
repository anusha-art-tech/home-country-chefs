import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('origin-foods-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('token')));

  useEffect(() => {
    if (user) {
      localStorage.setItem('origin-foods-user', JSON.stringify(user));
      return;
    }

    localStorage.removeItem('origin-foods-user');
  }, [user]);

  const login = (email, _password) => {
    const isChefAccount = email.toLowerCase().includes('chef');
    const mockUser = {
      id: isChefAccount ? 101 : 1,
      name: isChefAccount ? 'Chef Demo' : 'John Doe',
      email,
      role: isChefAccount ? 'chef' : 'user'
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('token', 'mock-token');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      role: userData.role || 'user'
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('token', 'mock-token');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('origin-foods-user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
