import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const setUserDB =  ( uid, displayName, email) => {

    return setDoc(doc(db, "users", uid), {
        uid,
        displayName,
        email
    })
}