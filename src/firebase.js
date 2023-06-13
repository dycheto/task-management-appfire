import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmW8GA88-GybKhBDkc8_yjX2FiFslU2V8",
    authDomain: "task-management-appfire.firebaseapp.com",
    projectId: "task-management-appfire",
    storageBucket: "task-management-appfire.appspot.com",
    messagingSenderId: "609959965434",
    appId: "1:609959965434:web:461efe0ee9e4d7198e8f43"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
