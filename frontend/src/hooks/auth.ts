import {useEffect, useState} from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token'),
    );

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        // Listen for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Check token on mount
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return isAuthenticated;
};

export default useAuth;
