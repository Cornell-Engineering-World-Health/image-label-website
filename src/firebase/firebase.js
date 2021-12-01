import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// // Optionally import the services that you want to use
// //import "firebase/auth";
// //import "firebase/database";
// //import "firebase/firestore";
// //import "firebase/functions";
// //import "firebase/storage";
// // import { firebaseConfig } from "./config";

const firebaseConfig = {
  apiKey: "AIzaSyC7VKTiT_61QOdGH08Tm1xA2uWtGNOZePA",
  authDomain: "image-upload-app-c2b16.firebaseapp.com",
  projectId: "image-upload-app-c2b16",
  storageBucket: "image-upload-app-c2b16.appspot.com",
  messagingSenderId: "2925612514",
  appId: "1:2925612514:web:4d74fd413fb2b2aeecfdbb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

var admin = require("firebase-admin");
var serviceAccount = require("./api_key.json");

admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  },
  "secondary"
);

var admin_auth = admin.auth();

export { auth, db, admin_auth, storage };
