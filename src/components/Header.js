import { useAuth } from "../hooks/useAuth";

export default function Header({
    handleClick
}) {

    const { userData } = useAuth();

    return (
        <header className="header">
            <h1 className="app-name">organizeIt</h1>
            <div className="user-info">
                <strong className="username">Welcome {userData.displayName}!</strong>
                <button className="logout-btn" onClick={handleClick}>
                    Logout
                </button>
            </div>
        </header>
    );
};