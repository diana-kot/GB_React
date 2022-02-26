// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOw-t9Uzg5Jf5wFsJn47cvCn3GpGM2gwQ",
  authDomain: "projectgb-57a4b.firebaseapp.com",
  projectId: "projectgb-57a4b",
  storageBucket: "projectgb-57a4b.appspot.com",
  messagingSenderId: "1063569160082",
  appId: "1:1063569160082:web:d93c8c6dd770da6d7b334b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signUp = (email, pass) =>
  createUserWithEmailAndPassword(auth, email, pass);

export const login = (email, pass) =>
  signInWithEmailAndPassword(auth, email, pass);
  
export const logout = () => signOut(auth);
