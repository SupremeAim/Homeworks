import { createContext, useContext, useState} from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        if (email === "user@mail.com" && password === "123") {
            setUser ({email, username : email.split("@") [0]});
            return true;
        }
        return false;
    };

    const logout = () => setUser (null);
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth() {
    return useContext(AuthContext);
}  