import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const login = async (email, password) => {

    try {

        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert(error.message);
        console.log(error.message);
    }
}

export const register = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        return user;
    } catch (error) {
        alert(error.message);
        return error
    }
}

