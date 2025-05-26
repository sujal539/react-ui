import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../helper";

const Protected = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // null means loading

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error("Error checking authentication:", error);
            }
        };

        checkAuth();
    }, []);

    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }
    if (isLoggedIn === true) {
        return children;
    }
    // Loading state
    return null; // or <div>Loading...</div>
};

export default Protected;
