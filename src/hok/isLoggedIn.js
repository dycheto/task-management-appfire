import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const isLoggedIn = (Component) => {
    const WrapperComponent = (props) => {

        const { isAuthenticated } = useAuth() || {};
        const location = useLocation();

        if (isAuthenticated) {
            return <Component {...props} />;
        }

        if (location.pathname === "/login" || location.pathname === "/register") {
            return <Component {...props} />;
        }

        return <Navigate to={"/"} />;
    };

    return WrapperComponent;
}