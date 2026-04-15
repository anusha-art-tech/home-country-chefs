import React, { createContext, useEffect, useState, useContext } from 'react';
import { authAPI, tokenStorage } from '../services/api';
import { normalizeChefMedia } from '../utils/helpers';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('origin-foods-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [chefProfile, setChefProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(tokenStorage.get()));
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('origin-foods-user', JSON.stringify(user));
      return;
    }

    localStorage.removeItem('origin-foods-user');
  }, [user]);

  useEffect(() => {
    const bootstrapAuth = async () => {
      const token = tokenStorage.get();

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe();
        setUser(response.data.data.user);
        setChefProfile(normalizeChefMedia(response.data.data.chefProfile) || null);
        setIsAuthenticated(true);
      } catch (error) {
        tokenStorage.clear();
        setUser(null);
        setChefProfile(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    bootstrapAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    const { token, data } = response.data;

    tokenStorage.set(token);
    setUser(data.user);
    setChefProfile(normalizeChefMedia(data.chefProfile) || null);
    setIsAuthenticated(true);

    return data.user;
  };

  const register = async (userData) => {
    const response = await authAPI.register(userData);
    const { token, data } = response.data;

    tokenStorage.set(token);
    setUser(data.user);
    setChefProfile(normalizeChefMedia(data.chefProfile) || null);
    setIsAuthenticated(true);

    return data.user;
  };

  const refreshAuth = async () => {
    const response = await authAPI.getMe();
    setUser(response.data.data.user);
    setChefProfile(normalizeChefMedia(response.data.data.chefProfile) || null);
    setIsAuthenticated(true);
    return response.data.data;
  };

  const logout = async () => {
    try {
      if (tokenStorage.get()) {
        await authAPI.logout();
      }
    } catch (error) {
      // Clear client auth state even if logout request fails.
    }

    setUser(null);
    setChefProfile(null);
    setIsAuthenticated(false);
    tokenStorage.clear();
    localStorage.removeItem('origin-foods-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        chefProfile,
        isAuthenticated,
        authLoading,
        login,
        register,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
