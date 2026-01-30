import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            // Check if token exists in localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const response = await authAPI.getProfile();
            setUser(response.data.data);
        } catch (error) {
            // Token is invalid or expired, clear it
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await authAPI.login({ email, password });
        const userData = response.data.data;

        // Store token in localStorage
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }

        setUser(userData);
        return response.data;
    };

    const register = async (name, email, password) => {
        const response = await authAPI.register({ name, email, password });
        const userData = response.data.data;

        // Store token in localStorage
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }

        setUser(userData);
        return response.data;
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        // Clear token from localStorage
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;

