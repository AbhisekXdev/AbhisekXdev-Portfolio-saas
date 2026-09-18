import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, loginWithGoogle, logout } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, current => {
    setUser(current);
    setLoading(false);
  }), []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      loginWithGoogle,
      logout,
      getToken: () => user?.getIdToken()
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
