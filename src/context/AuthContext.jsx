import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

const decodeJWT = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch { return null; }
};

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(() => {
        const t = localStorage.getItem('token');
        return t ? decodeJWT(t) : null;
    });

    const isAuthenticated = !!token;
    const isAdmin = user?.roles?.includes('ADMIN');

    const saveToken = useCallback((t) => {
        localStorage.setItem('token', t);
        setToken(t);
        setUser(decodeJWT(t));
    }, []);

    const login = async (email, password) => {
        const { data } = await authAPI.login(email, password);
        saveToken(data.token);
        return data;
    };

    const register = async (email, password) => {
        const { data } = await authAPI.register(email, password);
        saveToken(data.token);
        return data;
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []);

    useEffect(() => {
        if (token) {
            const payload = decodeJWT(token);
            if (payload?.exp && payload.exp * 1000 < Date.now()) logout();
        }
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
