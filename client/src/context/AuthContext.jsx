import { createContext, useEffect, useState } from 'react';
import { authApi } from '../api/appApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const currentUser = await authApi.me();
        if (active) {
          setUser(currentUser);
        }
      } catch (error) {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setAuthReady(true);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  const value = {
    user,
    authReady,
    isAuthenticated: Boolean(user),
    login: async payload => {
      const nextUser = await authApi.login(payload);
      setUser(nextUser);
      return nextUser;
    },
    signup: async payload => {
      const nextUser = await authApi.signup(payload);
      setUser(nextUser);
      return nextUser;
    },
    logout: async () => {
      try {
        await authApi.logout();
      } catch (error) {
        // Clear local state even if the backend session has already expired.
      }
      setUser(null);
    },
    setUsername: async username => {
      const nextUser = await authApi.setUsername(username);
      setUser(nextUser);
      return nextUser;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
