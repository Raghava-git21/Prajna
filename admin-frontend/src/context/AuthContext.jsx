import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('temple_admin_user');
    if (localStorage.getItem('temple_admin_token') && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('temple_admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    if (data.user.role !== 'admin') {
      throw new Error('Admin access required.');
    }
    localStorage.setItem('temple_admin_token', data.token);
    localStorage.setItem('temple_admin_user', JSON.stringify(data.user));
    setUser(data.user);
    toast.success(`Welcome, ${data.user.name}`);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('temple_admin_token');
    localStorage.removeItem('temple_admin_user');
    setUser(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};
