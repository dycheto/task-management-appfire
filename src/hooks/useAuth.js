import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState
}

