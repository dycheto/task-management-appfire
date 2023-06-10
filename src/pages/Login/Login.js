import { useState } from 'react';
import './Login.scss';
import { useNavigate, Link } from 'react-router-dom';
import * as authServices from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { isLoggedIn } from '../../hok/isLoggedIn';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const { setUserData } = useAuth();

    function handleLogin(e) {
        e.preventDefault();

        authServices.login(email, password)
            .then((userCredentials) => {

                setUserData(userCredentials.user);
                navigate(`/`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="login_logo">organizeIt</h1>
                <span className="title">Login</span>
                <form action="POST" onSubmit={handleLogin}>
                    <input type="email" placeholder="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    <button>Sing in</button>
                </form>
                <p>You don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
        </div>
    );
}

export default isLoggedIn(Login)

