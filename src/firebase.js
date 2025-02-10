// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjXV3uv_ajPigrQ-XoCRB9tVz35UqrYUk",
  authDomain: "anya-blog.firebaseapp.com",
  projectId: "anya-blog",
  storageBucket: "anya-blog.appspot.com",
  messagingSenderId: "254982007930",
  appId: "1:254982007930:web:404bee8db0a29642051fc3",
  measurementId: "G-2QMWDPBM1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };