import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { whiteLogoImgURL } from "../Data/imagesData";

export default function Header({
    handleLogoutClick
}) {
    const navigate = useNavigate();

    const { isAuthenticated, userData } = useAuth();
    const handleLogoClick = () => {
        navigate('/')
    }

    return (
        <header className="header">
            <img className="logo" aria-label='logo' src={whiteLogoImgURL} alt="Logo" onClick={handleLogoClick} />
            {isAuthenticated &&
                <div className="user-info">
                    <strong className="username">Welcome, {userData.displayName}!</strong>
                    <button className="logout-btn" onClick={handleLogoutClick}>
                        Logout
                    </button>
                </div>
            }

        </header>
    );
};

