import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth  = getAuth();

async function CreateUser(email, password, name){
    return createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
        // Signed in 
        console.log(user.user)
        updateProfile(user.user, {
            displayName: name
        })
    })
}

async function Signin(email, password){
    return signInWithEmailAndPassword(auth, email, password)
}

export { Signin, CreateUser, db }