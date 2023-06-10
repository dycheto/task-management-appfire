import './Register.scss'

import { useState } from 'react';
import * as authService from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { isLoggedIn } from '../../hok/isLoggedIn';

const Register = () => {

    const [displayName, setDisplayName] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [repeatPass, setRepeatPass] = useState(``);
    const [err, setErr] = useState(false)

    const { setUserData } = useAuth();
    const navigate = useNavigate()

    const handleRegiser = async (e) => {
        e.preventDefault();

        if (password !== repeatPass) {
            alert(`Passwords does not match!`);
        }

        try {

            const { user } = await authService.register(email, password, displayName);

            if (user) {

                updateProfile(user, {
                    displayName: displayName
                });

                let userData = auth.currentUser;

                setUserData(userData)
                navigate(`/`);

            } else {
                throw new Error(`Something broke`)
            }

        } catch (error) {
            setErr(true);
            alert(error.message);
            console.log(error.message);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="login_logo">organizeIt</h1>
                <span className="title">Register</span>
                <form action="POST" onSubmit={handleRegiser}>
                    <input type="text" placeholder="username" name='displayName' onChange={(e) => setDisplayName(e.target.value)} />
                    <input type="email" placeholder="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="repeat password" name='repeatPassword' onChange={(e) => setRepeatPass(e.target.value)} />
                    <button>Sing up</button>
                </form>
                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    );
}

export default isLoggedIn(Register)

