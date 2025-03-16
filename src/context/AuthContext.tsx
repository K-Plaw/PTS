import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  username: string;
  role: 'Admin' | 'Editor' | 'Viewer';
};

type AuthContextType = {
  user: User | null;
  login: (username: string, role: User['role']) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check local storage for persisted user data on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Login function
  const login = (username: string, role: User['role']) => {
    const newUser = { username, role };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Persist user data
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data
  };

  // Optional: Sync auth state across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user') {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};