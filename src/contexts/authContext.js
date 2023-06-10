import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useLocalStorage("user", null);

    return (
        <AuthContext.Provider value={{ userData, setUserData, isAuthenticated: Boolean(userData) }}>
            {children}
        </AuthContext.Provider>
    )
}
