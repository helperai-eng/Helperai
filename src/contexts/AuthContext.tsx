import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication for demo purposes
  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo, we'll just check if email contains 'teacher'
        const role = email.includes('teacher') ? 'teacher' : 'student';
        const user = {
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email,
          role
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher'): Promise<User> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};