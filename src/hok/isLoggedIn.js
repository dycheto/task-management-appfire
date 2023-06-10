import { useAuth } from "../hooks/useAuth";
import { Navigate } from 'react-router-dom'

export const isLoggedIn = (Component) => {

    const WrapperComponent = (props) => {

        const { isAuthenticated, userData } = useAuth();

        return isAuthenticated
            ? <Navigate to='/' />
            : < Component {...props} userData={userData} />

    }

    return WrapperComponent;
}