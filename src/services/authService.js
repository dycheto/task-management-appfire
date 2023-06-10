import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as userService from '../services/userService';
import useLocalStorage from '../hooks/useLocalStorage.js';

export const login = async (email, password) => {

    try {

        return await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {

        console.log(error.message);
    }

}

export const register = async (email, password, displayName) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user

    if (!user) {
        throw Error(`There is no user in the DB!`)
    }
    try {
        await userService.setUserDB(user.uid, displayName, email);


    } catch (err) {
        console.log(err.message);
    }


    updateProfile(response.user, {
        displayName
    });

    return {
        user
    }
}

