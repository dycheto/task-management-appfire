import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

//custom context hook
export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState
}

