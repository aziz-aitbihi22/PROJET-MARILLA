import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('marilla_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('marilla_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem('marilla_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem('marilla_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marilla_user');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
