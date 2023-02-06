import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

console.log(import.meta.env.apiKey);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
