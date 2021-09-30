import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";
// import { firebaseConfig } from "./config";

const firebaseConfig = {
  apiKey: "AIzaSyC7VKTiT_61QOdGH08Tm1xA2uWtGNOZePA",
  authDomain: "image-upload-app-c2b16.firebaseapp.com",
  projectId: "image-upload-app-c2b16",
  storageBucket: "image-upload-app-c2b16.appspot.com",
  messagingSenderId: "2925612514",
  appId: "1:2925612514:web:4d74fd413fb2b2aeecfdbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign in a user
const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Register a user with email & password
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Logout
const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  signIn,
  signUp,
  logout,
};
