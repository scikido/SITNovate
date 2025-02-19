import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC0toulP5Dfdk1w4T-pbDCztPhy5n1tIk",
  authDomain: "thryv-a76e0.firebaseapp.com",
  projectId: "thryv-a76e0",
  storageBucket: "thryv-a76e0.firebasestorage.app",
  messagingSenderId: "496011385926",
  appId: "1:496011385926:web:868e21725bd71ed276fe47",
  measurementId: "G-3B5PV4P5C7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in", error);
  }
};

export { auth, db, signInWithGoogle, doc, getDoc, setDoc, updateDoc };
