"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user?: {
    id: number;
    username: string;
    role: string;
  } | null;
  loading?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderType {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/profile");
      if (res?.data) {
        const user = res.data;
        setUser(user);
      }
    } catch (error: any) {
      console.error(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
