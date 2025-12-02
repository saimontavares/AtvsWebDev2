"use client";

import api from "@/utils/api";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserSession {
  userId: string;
  userType: string;
  userName: string;
}

interface IAuthContext {
  // undefined = checking, null = not authenticated, object = authenticated
  user: UserSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const initialAuthContextData: IAuthContext = {
  user: null,
  login: async () => false,
  logout: async () => {},
};

export const AuthContext = createContext<IAuthContext>(initialAuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        setUser(res.data);
        try {
          localStorage.setItem("auth_user", JSON.stringify(res.data));
        } catch {}
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const logout = async () => {
    const res = await api.post("/auth/logout");
    if (res.status === 200) {
      setUser(null);
      try {
        localStorage.removeItem("auth_user");
      } catch {}
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
