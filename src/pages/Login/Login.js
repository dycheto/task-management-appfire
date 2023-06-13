import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as authServices from '../../services/authServices';
import { useAuth } from '../../hooks/useAuth';
import { isNotLoggedIn } from '../../hok/isNotLoggedIn';
import { darkLogoImgURL } from '../../Data/imagesData';
import AlertModal from '../../components/reusable/AlertModal';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [showAlert, setShowAlert] = useState(false);
    const { setUserData } = useAuth() || {};

    function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            setShowAlert(true)
            return;
        }
    }

    authServices.login(email, password)
        .then((userCredentials) => {

            setUserData(userCredentials.user);
            navigate(`/main`);
        })
        .catch(err => {
        })

    const handleCloseAlert = () => {
        setShowAlert(false);
    };


    return (
        <div className="formContainer" data-testid="login-container">
            <div className="formWrapper">
                <img src={darkLogoImgURL} alt="" />
                <span className="title">Login</span>
                <form action="POST" onSubmit={handleLogin}>
                    <input type="email" placeholder="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    <button>Sign in</button>
                </form>
                <p>You don't have an account? <Link to={'/register'}>Register</Link></p>
            </div>
            <AlertModal
                isOpen={showAlert}
                title={"All fields are required!"}
                onClose={handleCloseAlert}
            />
        </div>
    );
}

export default isNotLoggedIn(Login);
export { Login as PureLogin }
