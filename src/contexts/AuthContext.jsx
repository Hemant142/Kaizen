import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('marketEdgeUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('marketEdgeUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('marketEdgeUser', JSON.stringify(user));
        navigate('/dashboard');
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    });
  }

  function register(name, email, password) {
    return new Promise((resolve, reject) => {
      const users = JSON.parse(localStorage.getItem('marketEdgeUsers') || '[]');
      if (users.find(u => u.email === email)) {
        reject(new Error('Email already in use'));
        return;
      }
      const newUser = { id: `user-${Date.now()}`, name, email, password };
      users.push(newUser);
      localStorage.setItem('marketEdgeUsers', JSON.stringify(users));
      // After registration, redirect to login
      navigate('/login');
      resolve();
    });
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('marketEdgeUser');
    navigate('/login');
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}