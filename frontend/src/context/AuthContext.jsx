import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('temple_user');
    if (localStorage.getItem('temple_token') && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('temple_user');
      }
    }
    setLoading(false);
  }, []);

  const saveSession = (payload) => {
    localStorage.setItem('temple_token', payload.token);
    localStorage.setItem('temple_user', JSON.stringify(payload.user));
    setUser(payload.user);
    return payload.user;
  };

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password });
      toast.success(`Welcome back, ${data.user.name}!`);
      return saveSession(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await registerUser({ name, email, password });
      toast.success(`Welcome, ${data.user.name}!`);
      return saveSession(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = ({ silent = false } = {}) => {
    localStorage.removeItem('temple_token');
    localStorage.removeItem('temple_user');
    setUser(null);
    if (!silent) toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
