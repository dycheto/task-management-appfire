import { useState } from 'react';
import * as authService from '../../services/authServices';
import { useNavigate, Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../hooks/useAuth';
import { isNotLoggedIn } from '../../hok/isNotLoggedIn';
import { darkLogoImgURL } from '../../Data/imagesData';
import AlertModal from '../../components/reusable/AlertModal';

const Register = () => {

    const [displayName, setDisplayName] = useState(``);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [repeatPass, setRepeatPass] = useState(``);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const { setUserData } = useAuth() || {};
    const navigate = useNavigate()

    const handleRegiser = async (e) => {
        e.preventDefault();

        if (displayName == "" || email == '') {
            setAlertMessage("All fields are required!")
            setShowAlert(true);
            return
        }

        if (password !== repeatPass) {
            setAlertMessage(`Passwords does not match!`);
            setShowAlert(true);
            return;
        }

        try {
            const user = await authService.register(email, password, displayName);
            if (user) {

                updateProfile(user, {
                    displayName: displayName
                }).then(res => {
                    let userData = auth.currentUser;
                    setUserData(userData);
                })
                navigate(`/`);
            } else {
                throw new Error(`Something broke`)
            }

        } catch (error) {
        }
    };


    const handleCloseAlert = () => {
        setShowAlert(false);
    };


    return (
        <div className="formContainer" data-testid="register-container">
            <div className="formWrapper">
                <img src={darkLogoImgURL} alt="" />
                <span className="title">Register</span>
                <form action="POST" onSubmit={handleRegiser}>
                    <input type="text" placeholder="username" name='displayName' onChange={(e) => setDisplayName(e.target.value)} />
                    <input type="email" placeholder="email" name='email' onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" name='password' onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="repeat password" name='repeatPassword' onChange={(e) => setRepeatPass(e.target.value)} />
                    <button>Sign up</button>
                </form>
                <p>Already have an account? <Link to={'/'}>Login</Link></p>
            </div>
            <AlertModal
                isOpen={showAlert}
                title={alertMessage}
                onClose={handleCloseAlert} />
        </div>
    );
}

export default isNotLoggedIn(Register);
export { Register as PureRegister };
