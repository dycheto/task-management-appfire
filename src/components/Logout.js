import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export default function Logout() {

    const { setUserData } = useAuth();

    setUserData(null);
    signOut(auth);

    return (
        <Navigate to={'/login'} />
    );
};
