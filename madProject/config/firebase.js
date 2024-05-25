// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Wv8E0p8G_cI34vNeRJ8teIXuSe12Lj4", 
  authDomain: "exporeactnativeeduschedling.firebaseapp.com",
  projectId: "exporeactnativeeduschedling",
  storageBucket: "exporeactnativeeduschedling.appspot.com",
  messagingSenderId: "376407126164",
  appId: "1:376407126164:web:bfad178156f82673d14481",
  measurementId: "G-9EBC39RX6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const userRef= collection(db,"users");
export const roomRef= collection(db,"rooms");
export const instructorRef= collection(db,"instructors");