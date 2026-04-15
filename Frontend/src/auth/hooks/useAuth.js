import { useContext, useEffect } from "react";
import { AuthContext } from '../auth.context';
import { login, register, logout, getMe } from '../services/auth.api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            const userData = {
                id: data.id,
                username: data.username,
                email: data.email
            };
            console.log(userData)
            setUser(user);
            return { success: true, user: userData };
        } catch (err) {
            setUser(null);
            const errorMessage = err.response?.data?.message || "Invalid email or password";
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }

    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            
            const userData = data.user || data; 
            setUser(userData);
            
            return { success: true, user: userData };
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Try again.";
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            return { success: true };
        } catch (err) {
            console.error("Logout error:", err);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            setLoading(true); 
            try {
                const data = await getMe();
                setUser(data.user || data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, [setUser, setLoading]); 

    return { 
        user, 
        loading, 
        handleLogin, 
        handleRegister, 
        handleLogout 
    };
};