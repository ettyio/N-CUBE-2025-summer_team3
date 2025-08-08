// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPPnPWBr3u9CxgqI1V92V9lXJk40Jfa94",
  authDomain: "summer-2025-ncube-team3.firebaseapp.com",
  projectId: "summer-2025-ncube-team3",
  storageBucket: "summer-2025-ncube-team3.firebasestorage.app",
  messagingSenderId: "326627756996",
  appId: "1:326627756996:web:8c91bdc5bcefd075997291",
  measurementId: "G-189GCQN9X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth };
export const db = getFirestore(app);
export { storage };