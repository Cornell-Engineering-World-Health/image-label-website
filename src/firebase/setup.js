import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC7VKTiT_61QOdGH08Tm1xA2uWtGNOZePA',
  authDomain: 'image-upload-app-c2b16.firebaseapp.com',
  projectId: 'image-upload-app-c2b16',
  storageBucket: 'image-upload-app-c2b16.appspot.com',
  messagingSenderId: '2925612514',
  appId: '1:2925612514:web:4d74fd413fb2b2aeecfdbb',
};

//workaround for creating user
const secondaryConfig = {
  apiKey: 'AIzaSyC7VKTiT_61QOdGH08Tm1xA2uWtGNOZePA',
  authDomain: 'image-upload-app-c2b16.firebaseapp.com',
  projectId: 'image-upload-app-c2b16',
  storageBucket: 'image-upload-app-c2b16.appspot.com',
  messagingSenderId: '2925612514',
  appId: '1:2925612514:web:62f257540a70492cecfdbb',
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(secondaryConfig, 'Secondary');
const auth = getAuth(app);
const secondaryAuth = getAuth(secondaryApp);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, secondaryAuth };
