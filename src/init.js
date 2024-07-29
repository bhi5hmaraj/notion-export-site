// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWrp2L4b7aw4Mf6G_fL4kocBxt82jy-6A",
  authDomain: "notion-notes-31439.firebaseapp.com",
  projectId: "notion-notes-31439",
  storageBucket: "notion-notes-31439.appspot.com",
  messagingSenderId: "1031843002753",
  appId: "1:1031843002753:web:98ab8dd1e1c47494ac1080",
  measurementId: "G-M7EJK2205N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export var authChanged = onAuthStateChanged;
export var signIn = signInWithEmailAndPassword;
export var createUser = createUserWithEmailAndPassword;