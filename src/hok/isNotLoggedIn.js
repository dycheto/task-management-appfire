import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const isNotLoggedIn = (Component) => {

    const WrapperComponent = (props) => {

        const { isAuthenticated } = useAuth();

        return isAuthenticated === false
            ? < Component {...props} />
            : <Navigate to={"/main"}/>
    }

    return WrapperComponent;
}