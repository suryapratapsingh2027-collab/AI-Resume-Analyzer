import { useContext, useEffect } from "react";
import { AuthContext } from '../auth.context';
import { login, register, logout, getMe } from '../services/auth.api';

export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Safety check: Agar context wrap nahi hai toh error throw kare
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setLoading } = context;

    // --- LOGIN HANDLER ---
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
            // Backend se aane wala error message nikaal rahe hain
            const errorMessage = err.response?.data?.message || "Invalid email or password";
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }

    };

    // --- REGISTER HANDLER ---
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            
            // Register ke baad aksar backend user data bhejta hai
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

    // --- LOGOUT HANDLER ---
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

    // --- PERSIST SESSION (Get Me) ---
    useEffect(() => {
        const getAndSetUser = async () => {
            // App load hote hi loading true karein jab tak user check ho raha hai
            setLoading(true); 
            try {
                const data = await getMe();
                // Ensure karein ki data.user hai ya directly data hi user hai
                setUser(data.user || data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getAndSetUser();
    }, [setUser, setLoading]); // Dependencies add karna achi practice hai

    return { 
        user, 
        loading, 
        handleLogin, 
        handleRegister, 
        handleLogout 
    };
};