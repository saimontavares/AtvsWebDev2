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
  user: UserSession | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
}

const initialAuthContextData: IAuthContext = {
  user: null,
  login: async () => false,
  signup: async () => ({ success: false }),
  logout: async () => { },
}

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

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await api.post("/auth/signup", { name, email, password })
      if (res.status === 200) {
        // Após criar conta, faz login automático
        const loginOk = await login(email, password)
        if (loginOk) {
          return { success: true }
        }
        return { success: true, message: "Conta criada! Faça login." }
      }
      return { success: false, message: "Erro ao criar conta" }
    } catch (error: any) {
      console.log(error)
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Erro ao criar conta. Email já cadastrado?"
      return { success: false, message: msg }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        setUser(res.data);
        try {
          localStorage.setItem("auth_user", JSON.stringify(res.data));
          
          // Sincronizar carrinho local com o backend
          const localCart = localStorage.getItem("cartProducts");
          if (localCart) {
            const cartProducts: Record<string, number> = JSON.parse(localCart);
            // Enviar cada item do carrinho local para o backend
            for (const [productId, quantity] of Object.entries(cartProducts)) {
              for (let i = 0; i < quantity; i++) {
                await api.post("/purchaseItem/inc", { productId });
              }
            }
            // Limpar carrinho local após sincronizar
            localStorage.removeItem("cartProducts");
          }
        } catch { }
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
      } catch { }
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
