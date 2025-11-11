"use client"

import api from "@/utils/api";
import {createContext, ReactNode, useEffect, useState } from  "react";

interface UserSession {
    userId: string;
    userType: string;
    userName: string;
}

interface IAuthContext {
    user: UserSession | null,
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void
}

const initialAuthContextData: IAuthContext = {
    user: null,
    login: async () => false,
    logout: () => {}
}

const AuthContext = createContext<IAuthContext>(initialAuthContextData);

function AuthProvider({children}: {children : ReactNode}){
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.get('/auth/me').then((res) => {
            setUser(res.data);
        }).catch((error) => {
            setUser(null);
            console.log(error);
        })
    }, []);
    const login = async (email: string, password: string) => {
        try {
        const res = await api.post('/auth/login', {email, password});
        if(res.status === 200){
            setUser(res.data)
            return true;
        }
        return false;
    } catch (error) {
        console.log(error)
        return false;
    }
    }
    const logout = async () => {
        const res = await api.post('/auth/logout');
        if(res.status === 200){
            setUser(null);
        }
    }
    return <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>;
}

export {AuthProvider, AuthContext};