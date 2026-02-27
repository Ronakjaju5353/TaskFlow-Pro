import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = [
  { email: 'admin@taskflow.com', password: 'admin123', name: 'Admin User', role: 'Administrator' },
  { email: 'staff@taskflow.com', password: 'staff123', name: 'Staff Member', role: 'Staff' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tf_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userData = { email: found.email, name: found.name, role: found.role };
      setUser(userData);
      localStorage.setItem('tf_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tf_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
